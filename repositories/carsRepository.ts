import { CarsModel } from "../models/carsModel";

class CarsRepository {
  static async create(carData: any) {
    return await CarsModel.query().insert(carData);
  }

  static async findAll() {
    return await CarsModel.query();
  }

  static async findById(carId: string) {
    return await CarsModel.query().findById(carId);
  }

  static async updateCarById(carId: string, carData: any) {
    return await CarsModel.query().patchAndFetchById(carId, carData);
  }

  static async delete(carId: string, userId: string) {
    return await CarsModel.query().patchAndFetchById(carId, {
      deleted_status: "deleted",
      deleted_by: userId,
    });
  }

  static async findAllAvailable() {
    const today = new Date().toISOString();
    return await CarsModel.query()
      .where("deleted_status", "active")
      .andWhere("start_rent", "<=", today)
      .andWhere((builder) => {
        builder.where("finish_rent", ">=", today).orWhereNull("finish_rent");
      });
  }
}
export default CarsRepository;
