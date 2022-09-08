import express from "express";
const router = express.Router();

import {
  register,
  getAllVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

router.route("/").post(register).get(getAllVehicle);
router.route("/:id").put(updateVehicle).delete(deleteVehicle);

export default router;
