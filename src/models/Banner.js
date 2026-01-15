import mongoose from "mongoose";
const bannerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    placement: { type: String, enum: ["Homepage", "Footer", "Other"], required: true },
    status: { type: String, enum: ["Active", "Scheduled", "Inactive"], default: "Inactive" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

bannerSchema.index({ status: 1 });
bannerSchema.index({ updatedAt: -1 });

export default mongoose.model("Banner", bannerSchema);
