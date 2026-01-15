//` models/Account.js
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    venue: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Suspend"],
      default: "Active",
    },

    avatar: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["vendor", "customer", "superadmin"],
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
