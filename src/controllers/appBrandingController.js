import AppBranding from "../models/AppBranding.js";

/* ================= GET BRANDING ================= */
export const getBranding = async (req, res) => {
  const branding = await AppBranding.findOne();
  res.json(branding || {});
};

/* ================= UPDATE BRANDING ================= */
export const updateBranding = async (req, res) => {
  const update = {};

  if (req.files?.primaryLogo?.[0]) {
    update.primaryLogo = `/uploads/branding/${req.files.primaryLogo[0].filename}`;
  }

  if (req.files?.appIcon?.[0]) {
    update.appIcon = `/uploads/branding/${req.files.appIcon[0].filename}`;
  }

  update.updatedBy = req.user.id;

  const branding = await AppBranding.findOneAndUpdate(
    {},
    { $set: update },
    { upsert: true, new: true }
  );

  res.json({
    success: true,
    data: branding,
  });
};
