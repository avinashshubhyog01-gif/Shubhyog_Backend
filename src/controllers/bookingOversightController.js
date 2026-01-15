import Booking from "../models/Booking.js";

/* ================= LIST BOOKINGS ================= */
export const getBookingOversight = async (req, res) => {
  try {
    let {
      search = "",
      status = "All",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // STATUS MAPPING (UI → DB)
    if (status !== "All") {
      query.status = status === "Complete" ? "Completed" : status;
    }

    // SEARCH
    if (search) {
      query.$or = [
        { attendee: { $regex: search, $options: "i" } },
        { venue: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      Booking.find(query)
        .sort({ bookingDate: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Booking.countDocuments(query),
    ]);

    const data = rows.map((b, index) => ({
      id: `BK${String(skip + index + 1).padStart(3, "0")}`,
      _id: b._id,
      attendee: b.attendee,
      venue: b.venue,
      date: b.bookingDate
        ? new Date(b.bookingDate).toLocaleString()
        : "—",
      guests: b.guests || 0,
      amount: `Rs. ${(b.amount || 0).toLocaleString()}`,
      status: b.status === "Completed" ? "Complete" : b.status,
      avatar:
        b.image ||
        "https://ui-avatars.com/api/?name=Guest&background=random",
    }));

    res.json({
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
    });
  } catch (err) {
    console.error("Booking Oversight error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/* ================= METRICS ================= */
export const getBookingOversightMetrics = async (req, res) => {
  try {
    const bookings = await Booking.find();

    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.amount || 0),
      0
    );

    const activeBookings = bookings.filter(
      (b) => b.status === "Completed"
    ).length;

    const pendingIssues = bookings.filter(
      (b) => b.status === "Pending"
    ).length;

    res.json({
      totalRevenue,
      activeBookings,
      pendingIssues,
      totalBookings: bookings.length,
    });
  } catch (err) {
    console.error("Metrics error:", err);
    res.status(500).json({ message: "Failed to fetch metrics" });
  }
};

/* ================= UPDATE STATUS ================= */
export const updateBookingOversightStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: status === "Complete" ? "Completed" : status,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};
