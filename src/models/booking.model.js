const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Wedding", "Birthday", "Corporate Event"],
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["Credit Card", "Paypal", "Cash", "Net Banking"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    attendee: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "Cancelled"],
      default: "Completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
