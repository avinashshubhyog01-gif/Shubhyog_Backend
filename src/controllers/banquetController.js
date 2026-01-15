import Banquet from "../models/Banquet.js";

/**
 * GET /api/banquets
 * List banquets with pagination, search, filters
 */
export const getBanquets = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, status, tab } = req.query;

    const query = { isActive: true };

    // Tabs
    if (tab === "Active") query.status = "Approved";
    if (tab === "New") query.status = "Pending";

    // Status filter (only when tab = All)
    if (tab === "All" && status && status !== "All") {
      query.status = status;
    }

    // Search
    if (search) {
      query.$or = [
        { owner: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { venue: { $regex: search, $options: "i" } },
      ];
    }

    const banquets = await Banquet.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Banquet.countDocuments(query);

    res.status(200).json({
      success: true,
      data: banquets,
      pagination: { page, limit, total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/banquets/:id
 * Single banquet (profile page)
 */
export const getBanquetById = async (req, res) => {
  try {
    const banquet = await Banquet.findById(req.params.id);

    if (!banquet) {
      return res.status(404).json({ success: false, message: "Banquet not found" });
    }

    res.status(200).json({ success: true, data: banquet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PUT /api/banquets/:id/status
 * Approve / Reject
 */
export const updateBanquetStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Pending", "Reject"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const banquet = await Banquet.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!banquet) {
      return res.status(404).json({ message: "Banquet not found" });
    }

    res.status(200).json({ success: true, data: banquet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
/**
 * DELETE /api/banquets/:id
 * Soft delete banquet
 */
export const deleteBanquet = async (req, res) => {
  try {
    const banquet = await Banquet.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!banquet) {
      return res.status(404).json({ success: false, message: "Banquet not found" });
    }

    res.status(200).json({ success: true, message: "Banquet deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

