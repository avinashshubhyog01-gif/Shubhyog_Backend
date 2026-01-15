// src/models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String, // ✅ ALWAYS STRING
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "superadmin", "banquetadmin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // ✅ 5 minutes (SAFE)
  },
});

export default mongoose.model("Otp", otpSchema);
