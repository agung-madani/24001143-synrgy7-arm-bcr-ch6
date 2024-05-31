import { Model, ModelObject } from "objection";
import { UsersModel } from "./usersModel";

export class CarsModel extends Model {
  static tableName = "cars";

  car_id!: string;
  car_name!: string;
  category!: "small" | "medium" | "large";
  start_rent!: Date | null;
  finish_rent!: Date | null;
  price!: number;
  created_at!: Date;
  updated_at!: Date;
  created_by!: string;
  updated_by!: string;
  deleted_status!: "active" | "deleted";
  deleted_by!: string | null;
  car_image!: string | null;

  static get idColumn() {
    return "car_id";
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: "cars.created_by",
          to: "users.id",
        },
      },
      updatedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: "cars.updated_by",
          to: "users.id",
        },
      },
      deletedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: "cars.deleted_by",
          to: "users.id",
        },
      },
    };
  }
}

export type Cars = ModelObject<CarsModel>;
