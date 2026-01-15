// shubhyog_backend/src/controllers/venueController.js
import Venue from "../models/Venue.js";

/**
 * @desc    Get all venues (with pagination)
 * @route   GET /api/venues
 */
export const getVenues = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const venues = await Venue.find({ isActive: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Venue.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: venues,
      pagination: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single venue
 * @route   GET /api/venues/:id
 */
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({ success: false, message: "Venue not found" });
    }

    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create new venue
 * @route   POST /api/venues
 */
export const createVenue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update venue
 * @route   PUT /api/venues/:id
 */
export const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!venue) {
      return res.status(404).json({ success: false, message: "Venue not found" });
    }

    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete venue (soft delete)
 * @route   DELETE /api/venues/:id
 */
export const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!venue) {
      return res.status(404).json({ success: false, message: "Venue not found" });
    }

    res.status(200).json({ success: true, message: "Venue deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
