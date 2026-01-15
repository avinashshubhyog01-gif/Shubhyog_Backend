// src/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingDate: Date,
    amount: Number,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    venue: String,
    attendee: String,
    guests: Number,
    paymentType: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
