import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    numberPlate: {
      type: String,
      required: [true, "Please provide number plate"],
      minlength: 3,
      maxlength: 15,
      trim: true,
      unique: true,
    },

    numberPlateType: {
      type: String,
      enum: ["Vintage", "Old", "Modern"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vehicle", vehicleSchema);
