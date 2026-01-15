import mongoose from "mongoose";

const MarriageMuhuratSchema = new mongoose.Schema(
  {
    date: {
      type: String, // YYYY-MM-DD (MAIN calendar date)
      required: true,
      index: true,
    },
    startTime: {
      type: String, // HH:mm
      required: true,
    },
    endTime: {
      type: String, // HH:mm
      required: true,
    },
    endDate: {
      type: String, // YYYY-MM-DD (optional if muhurat crosses midnight)
    },
    nakshatra: String,
    tithi: String,
    religion: {
      type: String,
      default: "Hindu",
    },
    muhuratType: {
      type: String,
      default: "Marriage",
    },
    quality: {
      type: String,
      default: "High",
    },
    year: {
      type: Number,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MarriageMuhurat", MarriageMuhuratSchema);
