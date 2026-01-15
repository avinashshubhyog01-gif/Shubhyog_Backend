// ================== IMPORTS ==================
import otpUtil from "../utils/otp.js";
const { generateOtp, sendOtpMsg91 } = otpUtil;

import jwtUtil from "../utils/jwt.js";
const { generateToken } = jwtUtil;

import Otp from "../models/Otp.js";
import User from "../models/User.js";

import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const SUPERADMIN_MOBILE = process.env.SUPERADMIN_MOBILE || "9999999999";

// =====================================================
// USER OTP LOGIN
// =====================================================
export async function requestUserOtp(req, res) {
  const { mobile, otpLength } = req.body;
  if (!mobile) return res.status(400).json({ error: "Mobile required" });

  const otp = String(generateOtp(otpLength === 4 ? 4 : 6));

  await Otp.deleteMany({ mobile: String(mobile), role: "user" });
  await Otp.create({ mobile: String(mobile), otp, role: "user" });

  console.log(`OTP for USER ${mobile}: ${otp}`);
  res.json({ message: "OTP sent to user" });
}

export async function verifyUserOtp(req, res) {
  const { mobile, otp } = req.body;

  const record = await Otp.findOne({
    mobile: String(mobile),
    otp: String(otp),
    role: "user",
  });

  if (!record) return res.status(401).json({ error: "Invalid OTP" });

  await Otp.deleteMany({ mobile: String(mobile), role: "user" });

  let user = await User.findOne({ mobile: String(mobile), role: "user" });
  if (!user) user = await User.create({ mobile: String(mobile), role: "user" });

  const token = generateToken({
    id: user._id,
    mobile: user.mobile,
    role: user.role,
  });

  res.json({ message: "User verified", token });
}

// =====================================================
// SUPER ADMIN OTP LOGIN (FIXED)
// =====================================================
export async function requestSuperAdminOtp(req, res) {
  const { mobile } = req.body;

  if (String(mobile) !== SUPERADMIN_MOBILE) {
    return res.status(403).json({ message: "Only SuperAdmin allowed" });
  }

  const otp = String(generateOtp());

  await Otp.deleteMany({ mobile: String(mobile), role: "superadmin" });
  await Otp.create({ mobile: String(mobile), otp, role: "superadmin" });

  console.log(`OTP for SUPERADMIN ${mobile}: ${otp}`);
  res.json({ message: "OTP sent to SuperAdmin" });
}

export async function verifySuperAdminOtp(req, res) {
  const { mobile, otp } = req.body;

  try {
    const record = await Otp.findOne({ mobile, otp, role: "superadmin" });
    if (!record) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // OTP is valid → delete it
    await Otp.deleteMany({ mobile, role: "superadmin" });

    // 🔥 FIND, DO NOT CREATE AGAIN
    let user = await User.findOne({ mobile, role: "superadmin" });

    if (!user) {
      user = await User.create({
        mobile,
        role: "superadmin",
      });
    }

    const token = generateToken({
      id: user._id,
      mobile: user.mobile,
      role: user.role,
    });

    return res.json({
      message: "Super admin OTP verified.",
      token,
    });

  } catch (err) {
    console.error("verifySuperAdminOtp error:", err);

    // 👇 VERY IMPORTANT
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Super admin already exists. Please retry OTP.",
      });
    }

    res.status(500).json({ error: "Failed to verify OTP" });
  }
}

// =====================================================
// BANQUET ADMIN OTP LOGIN
// =====================================================
export async function requestBanquetAdminOtp(req, res) {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile required" });

  const otp = String(generateOtp());

  await Otp.deleteMany({ mobile: String(mobile), role: "banquetadmin" });
  await Otp.create({ mobile: String(mobile), otp, role: "banquetadmin" });

  console.log(`OTP for BANQUET ADMIN ${mobile}: ${otp}`);
  res.json({ message: "OTP sent to BanquetAdmin" });
}

export async function verifyBanquetAdminOtp(req, res) {
  const { mobile, otp } = req.body;

  const record = await Otp.findOne({
    mobile: String(mobile),
    otp: String(otp),
    role: "banquetadmin",
  });

  if (!record) return res.status(401).json({ error: "Invalid OTP" });

  await Otp.deleteMany({ mobile: String(mobile), role: "banquetadmin" });

  let user = await User.findOne({
    mobile: String(mobile),
    role: "banquetadmin",
  });

  if (!user) {
    user = await User.create({
      mobile: String(mobile),
      role: "banquetadmin",
    });
  }

  const token = generateToken({
    id: user._id,
    mobile: user.mobile,
    role: user.role,
  });

  res.json({ success: true, token });
}
