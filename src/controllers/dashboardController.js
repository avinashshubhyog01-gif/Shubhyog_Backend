import Booking from "../models/Booking.js";
// Dashboard statistics controller
export const getDashboardStats = async (req, res) => {
  try {
    res.json({
      totalRevenue: 1250000,
      totalDeposits: 8340,
      activeBookings: 19,
      pendingIssues: 3,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Dashboard fetch failed' });
  }
};

// Revenue chart data controller
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const getRevenueStats = async (req, res) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();

    const result = await Booking.aggregate([
      {
        $match: {
          status: "Completed",
          bookingDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$bookingDate" },
          revenue: { $sum: "$amount" }
        }
      }
    ]);

    const monthlyRevenue = MONTHS.map((m, i) => {
      const found = result.find(r => r._id === i + 1);
      return {
        month: m,
        revenue: found ? found.revenue : 0
      };
    });

    res.json({
      year,
      data: monthlyRevenue
    });
  } catch (err) {
    console.error("Revenue stats error:", err);
    res.status(500).json({ message: "Failed to fetch revenue stats" });
  }
};
