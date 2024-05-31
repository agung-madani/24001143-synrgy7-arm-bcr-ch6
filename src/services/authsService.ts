import UsersRepository from "../repositories/usersRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthsService {
  static async login(email: string) {
    const user = await UsersRepository.findByEmail(email);
    if (!user) {
      return {
        status: 400,
        data: {
          message:
            "The email or password provided is incorrect. Please check your credentials and try again.",
        },
      };
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return { status: 201, data: { token, role: user.role } };
  }

  static async register(username: string, email: string, password: string) {
    const existingUsername = await UsersRepository.findByUsername(username);
    const existingEmail = await UsersRepository.findByEmail(email);

    if (existingUsername && existingEmail) {
      return {
        status: 409,
        data: {
          message:
            "Username or email is already in use. Please choose a different one.",
        },
      };
    } else if (existingUsername) {
      return {
        status: 409,
        data: {
          message: "Username already in use. Please choose a different one.",
        },
      };
    } else if (existingEmail) {
      return {
        status: 409,
        data: {
          message: "Email already in use. Please choose a different one.",
        },
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UsersRepository.create({
      username,
      email,
      password: passwordHash,
      role: "member",
    });
    return { status: 201, data: { user } };
  }
}

export default AuthsService;
