import Booking from "../models/Booking.js";

/* =========================
   GET /api/bookings
========================= */
export const getBookings = async (req, res) => {
  try {
    let { status = "All", month, page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {};

    // 🔥 STATUS FILTER (FIXED)
    if (status && status !== "All") {
      query.status = status;
    }

    // 🔥 MONTH FILTER
    if (month && month >= 1 && month <= 12) {
      const year = new Date().getFullYear();
      query.bookingDate = {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Booking.find(query)
        .sort({ bookingDate: -1 })
        .skip(skip)
        .limit(limit),
      Booking.countDocuments(query),
    ]);

    res.json({
      data,
      pagination: { total, page, limit },
    });
  } catch (err) {
    console.error("Booking fetch error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/* =========================
   POST /api/bookings
========================= */
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking added successfully",
      data: booking,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   PUT /api/bookings/:id
========================= */
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking" });
  }
};

/* =========================
   DELETE /api/bookings/:id
========================= */
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
};
/* =========================
   GET /api/bookings/:id
========================= */
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch booking" });
  }
};
