import Vehicle from "../models/Vehicle.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

import { plateNumberType } from "../utils/plateNumberType.js";
import { isValidLicensePlate } from "../utils/isValidLicensePlate.js";
import { formatNumberPlate } from "../utils/formatNumberPlate.js";

const register = async (req, res, next) => {
  try {
    const { numberPlate } = req.body;

    //check number plate is empty
    if (!numberPlate) {
      const err = new BadRequestError("Please provide number plate");
      next(err);
    }

    //format number plate
    const formattedNumPlate = formatNumberPlate(numberPlate);

    //check number plate is already exist or not
    const numberPlateAlreadyExists = await Vehicle.findOne({
      numberPlate: formattedNumPlate,
    });

    if (numberPlateAlreadyExists) {
      const err = new BadRequestError("Number plate is already exists");
      next(err);
    }

    //call regex function
    const numPlateType = plateNumberType(numberPlate);
    const isValidLicenseNumPlate = isValidLicensePlate(numberPlate);

    //check number plate is valid or invalid
    if (!isValidLicenseNumPlate) {
      const err = new NotFoundError(
        `No vehicle with Number Plate :${numberPlate}`
      );
      next(err);
    }

    //if it is not error save db
    if (numberPlate && !numberPlateAlreadyExists && isValidLicenseNumPlate) {
      const vehicleDetails = new Vehicle({
        numberPlate: formattedNumPlate,
        numberPlateType: numPlateType,
      });

      const vehicle = await vehicleDetails.save();

      res.status(201).json({ vehicle });
    }
  } catch (error) {
    next(error);
  }
};

const getAllVehicle = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();

    res.status(200).json({ vehicles });
  } catch (error) {
    next(error);
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const { id: vehicleId } = req.params;
    const { numberPlate } = req.body;

    //check number plate is empty
    if (!numberPlate) {
      const err = new BadRequestError("Please provide number plate");
      next(err);
    }

    //vehicle id find from database
    const vehicle = await Vehicle.findOne({ _id: vehicleId });

    if (!vehicle) {
      const err = new NotFoundError(
        `No vehicle with Number Plate :${vehicleId}`
      );
      next(err);
    }

    //format number plate
    const formattedNumPlate = formatNumberPlate(numberPlate);

    //check number plate is already exist or not
    const numberPlateAlreadyExists = await Vehicle.findOne({
      numberPlate: formattedNumPlate,
    });

    if (numberPlateAlreadyExists) {
      const err = new BadRequestError("Number plate is already exists");
      next(err);
    }

    //call regex function
    const numPlateType = plateNumberType(numberPlate);
    const isValidLicenseNumPlate = isValidLicensePlate(numberPlate);

    //check number plate is valid or invalid
    if (!isValidLicenseNumPlate) {
      const err = new NotFoundError(
        `No vehicle with Number Plate :${numberPlate}`
      );
      next(err);
    }

    //if it is not error save db
    if (
      vehicle &&
      numberPlate &&
      !numberPlateAlreadyExists &&
      isValidLicenseNumPlate
    ) {
      const updateVehicle = await Vehicle.findOneAndUpdate(
        { _id: vehicleId },
        {
          numberPlate: formattedNumPlate,
          numberPlateType: numPlateType,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ updateVehicle });
    }
  } catch (error) {
    next(error);
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const { id: vehicleId } = req.params;

    //vehicle id find from database
    const vehicle = await Vehicle.findOne({ _id: vehicleId });

    if (!vehicle) {
      const err = new NotFoundError(
        `No vehicle with Number Plate :${vehicleId}`
      );
      next(err);
    }

    await vehicle.remove();

    res.status(200).json({ msg: "Success! your vehicle removed" });
  } catch (error) {
    next(error);
  }
};

export { register, getAllVehicle, updateVehicle, deleteVehicle };
