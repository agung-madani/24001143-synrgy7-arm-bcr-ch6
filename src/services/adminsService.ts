import UsersRepository from "../repositories/usersRepository";
import bcrypt from "bcrypt";

class AdminsService {
  static async addAdmin(username: string, email: string, password: string) {
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
      role: "admin",
    });
    return { status: 201, data: { user } };
  }

  static async getAdmins() {
    const admin = await UsersRepository.findAll();
    return admin;
  }

  static async getAdminById(id: string) {
    const admin = await UsersRepository.findById(id);
    return admin;
  }

  static async updateAdminById(
    id: string,
    username: string | null,
    email: string | null,
    password: string | null
  ) {
    const adminExists = await UsersRepository.findById(id);

    if (!adminExists) {
      return { status: 404, data: { message: "Admin not found." } };
    }

    if (username || email || password) {
      const existingUsername = username
        ? await UsersRepository.findByUsername(username)
        : null;
      const existingEmail = email
        ? await UsersRepository.findByEmail(email)
        : null;

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

      const passwordHash = password
        ? await bcrypt.hash(password, 10)
        : undefined;

      const userData: any = {};
      if (username) userData.username = username;
      if (email) userData.email = email;
      if (passwordHash) userData.password = passwordHash;

      const user = await UsersRepository.updateById(id, userData);
      return { status: 200, data: { user } };
    } else {
      return {
        status: 400,
        data: { message: "At least one field should be filled." },
      };
    }
  }

  static async deleteAdminById(id: string) {
    const adminExists = await UsersRepository.findById(id);

    if (!adminExists) {
      return { status: 404, data: { message: "Admin not found." } };
    }

    await UsersRepository.deleteById(id);
    return { status: 204, data: { message: "Admin deleted successfully." } };
  }
}

export default AdminsService;
