// controllers/accountController.js
import Account from "../models/Account.js";

/**
 * GET /accounts
 * Query params:
 *  - role: vendor | customer (omit for all)
 *  - status: Active | Suspend (omit for all)
 *  - search
 *  - page
 *  - limit
 */
export const getAccounts = async (req, res) => {
  try {
    let {
      role,
      status,
      search = "",
      page = 1,
      limit = 10,
    } = req.query;

    // 🔥 NORMALIZE SAFELY
    role = role ? role.toLowerCase() : null;
    status = status ? status.toLowerCase() : null;

    const query = {};

    // Role filter
    if (role && role !== "all") {
      query.role = role; // vendor | customer
    }

    // Status filter
    if (status && status !== "all") {
      query.status =
        status.charAt(0).toUpperCase() + status.slice(1);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { venue: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [accounts, total] = await Promise.all([
      Account.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Account.countDocuments(query),
    ]);

    res.json({
      data: accounts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get accounts error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * PATCH /accounts/:id/status
 */
export const updateAccountStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Suspend"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(account);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};
/**
 * GET /accounts/:id
 * Get single account (Vendor / Customer / Admin)
 */
export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      data: account,
    });
  } catch (error) {
    console.error("Get account by ID error:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};
