// shubhyog_backend/src/models/Venue.js
import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String, // image URL (Cloudinary / S3 later)
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number, // store number, not ₹ string
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Venue", venueSchema);
