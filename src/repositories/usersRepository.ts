import { UsersModel } from "../models/usersModel";

class UsersRepository {
  static async findByUsername(username: string) {
    return await UsersModel.query().findOne({ username });
  }

  static async findByEmail(email: string) {
    return await UsersModel.query().findOne({ email });
  }

  static async create(userData: any) {
    return await UsersModel.query().insert(userData);
  }

  static async findAll() {
    return await UsersModel.query().where("role", "admin");
  }

  static async findById(id: string) {
    return await UsersModel.query().findById(id);
  }

  static async updateById(id: string, userData: any) {
    return await UsersModel.query().findById(id).patch(userData);
  }

  static async deleteById(id: string) {
    return await UsersModel.query().deleteById(id);
  }
}

export default UsersRepository;
