import Banner from "../models/Banner.js";

/* ================= CREATE BANNER ================= */
export const createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const banner = await Banner.create({
      image: `/uploads/${req.file.filename}`,
      placement: req.body.placement,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: {
        ...banner.toObject(),
        image: `/uploads/${req.file.filename}`, // 🔥 ENSURE STRING
      },
    });
  } catch (err) {
    console.error("Create banner error:", err);
    res.status(500).json({ message: err.message });
  }
};




/* ================= GET BANNERS ================= */
export const getBanners = async (req, res) => {
  try {
    const { status = "All", page = 1, limit = 10 } = req.query;

    const query = {};
    if (status !== "All") query.status = status;

    const skip = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      Banner.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(), // 🔥 important
      Banner.countDocuments(query),
    ]);

    res.json({
      data: rows, // ✅ send as-is
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
    });
  } catch (err) {
    console.error("Get banners error:", err);
    res.status(500).json({ message: "Failed to fetch banners" });
  }
};


/* ================= UPDATE STATUS ================= */
export const updateBannerStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Banner.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update banner status error:", err);
    res.status(500).json({ message: "Failed to update banner status" });
  }
};

/* ================= DELETE BANNER ================= */
export const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete banner error:", err);
    res.status(500).json({ message: "Failed to delete banner" });
  }
};
