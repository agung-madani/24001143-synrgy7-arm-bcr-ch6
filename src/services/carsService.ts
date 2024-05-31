import { checkPrime } from "crypto";
import CarsRepository from "../repositories/carsRepository";

class CarsService {
  static async createCar(
    car_name: string,
    category: string,
    price: number,
    car_image: string,
    userId: string,
    start_rent: Date,
    finish_rent: Date
  ) {
    async function isValidDate(dateString: Date): Promise<boolean> {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    }

    const startRent = (await isValidDate(start_rent))
      ? new Date(start_rent)
      : null;
    const finishRent = (await isValidDate(finish_rent))
      ? new Date(finish_rent)
      : null;

    if (startRent === null && finishRent !== null) {
      return {
        status: 400,
        data: {
          message:
            "The finish rent date can only be filled if the start rent date is already filled.",
        },
      };
    }

    const car = await CarsRepository.create({
      car_name,
      category,
      start_rent: startRent,
      finish_rent: finishRent,
      price,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: userId,
      updated_by: userId,
      deleted_status: "active",
      deleted_by: null,
      car_image: car_image || null,
    });
    return { status: 201, data: { car } };
  }

  static async getCars() {
    const cars = await CarsRepository.findAll();
    return cars;
  }

  static async getCarById(carId: string) {
    const car = await CarsRepository.findById(carId);
    return car;
  }

  static async updateCarById(
    carId: string,
    car_name: string,
    category: string,
    price: number,
    car_image: string | null,
    userId: string,
    start_rent: Date | null,
    finish_rent: Date | null,
    created_by: string,
    created_at: Date,
    deleted_status: string,
    deleted_by: string | null
  ) {
    const car = await CarsRepository.findById(carId);
    if (!car) {
      return { status: 404, data: { message: "Car not found." } };
    }

    async function isValidDate(dateString: Date): Promise<boolean> {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    }

    if (start_rent !== null) {
      start_rent = (await isValidDate(start_rent))
        ? new Date(start_rent)
        : null;
    }

    if (finish_rent !== null) {
      finish_rent = (await isValidDate(finish_rent))
        ? new Date(finish_rent)
        : null;
    }

    if (start_rent === null && finish_rent !== null) {
      return {
        status: 400,
        data: {
          error:
            "The finish rent date can only be filled if the start rent date is already filled.",
        },
      };
    }

    const updatedCar = await CarsRepository.updateCarById(carId, {
      car_name,
      category,
      start_rent: start_rent,
      finish_rent: finish_rent,
      price,
      updated_at: new Date(),
      updated_by: userId,
      car_image: car_image || null,
      created_by: created_by,
      created_at: created_at,
      deleted_status: deleted_status,
      deleted_by: deleted_by,
    });
    return { status: 200, data: { updatedCar } };
  }

  static async deleteCarById(carId: string, userId: string) {
    const car = await CarsRepository.findById(carId);
    if (!car) {
      return { status: 404, data: { message: "Car not found." } };
    }
    const deletedCar = await CarsRepository.delete(carId, userId);
    return { status: 201, data: { deletedCar } };
  }

  static async getAvailableCars() {
    const cars = await CarsRepository.findAllAvailable();
    return cars;
  }
}

export default CarsService;
