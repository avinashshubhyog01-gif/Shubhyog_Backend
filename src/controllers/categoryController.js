import Category from "../models/Category.js";
import mongoose from "mongoose";

/* =====================================================
   GET CATEGORIES (PAGINATED)
===================================================== */
export const getCategories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      Category.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Category.countDocuments({ isDeleted: false }),
    ]);

    res.json({
      data: rows.map((c) => ({
        id: c._id,
        name: c.name,
        status: c.status,
        createdAt: c.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

/* =====================================================
   CREATE CATEGORY (FIXED & SAFE)
===================================================== */
export const createCategory = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    console.log("🟢 CREATE CATEGORY HIT");


    const { name, status = true } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const exists = await Category.findOne({
      name: name.trim(),
      isDeleted: false,
    });

    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: name.trim(),
      status: Boolean(status),
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      data: {
        id: category._id,
        name: category.name,
        status: category.status,
      },
    });
  } catch (err) {
    console.error("🔥 CREATE CATEGORY ERROR:", err);
    return res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

/* =====================================================
   UPDATE CATEGORY (NAME + STATUS)
===================================================== */
export const updateCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        status: Boolean(status),
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: {
        id: category._id,
        name: category.name,
        status: category.status,
      },
    });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ message: "Failed to update category" });
  }
};

/* =====================================================
   UPDATE CATEGORY STATUS (TOGGLE)
===================================================== */
export const updateCategoryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({
        message: "Status must be boolean",
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      status: category.status,
    });
  } catch (err) {
    console.error("Update category status error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* =====================================================
   DELETE CATEGORY (SOFT DELETE)
===================================================== */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
