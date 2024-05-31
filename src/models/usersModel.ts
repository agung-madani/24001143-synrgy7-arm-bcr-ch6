import { Model, ModelObject } from "objection";
import { CarsModel } from "./carsModel";

export class UsersModel extends Model {
  static tableName = "users";

  id!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: "admin" | "superadmin" | "member";

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      carsCreated: {
        relation: Model.HasManyRelation,
        modelClass: CarsModel,
        join: {
          from: "users.id",
          to: "cars.created_by",
        },
      },
      carsUpdated: {
        relation: Model.HasManyRelation,
        modelClass: CarsModel,
        join: {
          from: "users.id",
          to: "cars.updated_by",
        },
      },
      carsDeleted: {
        relation: Model.HasManyRelation,
        modelClass: CarsModel,
        join: {
          from: "users.id",
          to: "cars.deleted_by",
        },
      },
    };
  }
}

export type Users = ModelObject<UsersModel>;
