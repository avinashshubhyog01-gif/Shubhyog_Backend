import mongoose from "mongoose";

const appBrandingSchema = new mongoose.Schema(
  {
    primaryLogo: {
      type: String, // /uploads/xxx.png
      required: false,
    },
    appIcon: {
      type: String, // /uploads/yyy.png
      required: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// 🔒 ENSURE SINGLE DOCUMENT ONLY
appBrandingSchema.index({}, { unique: true });

export default mongoose.model("AppBranding", appBrandingSchema);
