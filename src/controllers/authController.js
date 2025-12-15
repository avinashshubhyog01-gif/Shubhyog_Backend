// Super Admin OTP login controllers
import otpUtil from '../utils/otp.js';
const { generateOtp, sendOtpMsg91 } = otpUtil;
import jwtUtil from '../utils/jwt.js';
const { generateToken } = jwtUtil;
import Otp from '../models/Otp.js';

// Super Admin OTP login controllers
export async function requestSuperAdminOtp (req, res) {
	const { mobile } = req.body;
	if (!mobile) return res.status(400).json({ error: 'Mobile number required' });
	const otp = generateOtp();
	try {
		// Remove any existing OTP for this mobile/role
		await Otp.deleteMany({ mobile, role: 'superadmin' });
		// Save new OTP
		await Otp.create({ mobile, otp, role: 'superadmin' });
		await sendOtpMsg91(mobile, otp);
		res.json({ message: 'OTP sent to super admin.' });
	} catch (err) {
		res.status(500).json({ error: 'Failed to send OTP', details: err });
	}
}

export async function verifySuperAdminOtp (req, res) {
	const { mobile, otp } = req.body;
	if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP required' });
	const record = await Otp.findOne({ mobile, otp, role: 'superadmin' });
	if (record) {
		await Otp.deleteMany({ mobile, role: 'superadmin' });
		const token = generateToken({ mobile, role: 'superadmin' });
		return res.json({ message: 'Super admin OTP verified.', token });
	}
	res.status(401).json({ error: 'Invalid OTP' });
}

// Banquet Admin OTP login controllers
export async function requestBanquetAdminOtp (req, res) {
	const { mobile } = req.body;
	if (!mobile) return res.status(400).json({ error: 'Mobile number required' });
	const otp = generateOtp();
	try {
		await Otp.deleteMany({ mobile, role: 'banquetadmin' });
		await Otp.create({ mobile, otp, role: 'banquetadmin' });
		await sendOtpMsg91(mobile, otp);
		res.json({ message: 'OTP sent to banquet admin.' });
	} catch (err) {
		res.status(500).json({ error: 'Failed to send OTP', details: err });
	}
}

export async function verifyBanquetAdminOtp (req, res) {
	const { mobile, otp } = req.body;
	if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP required' });
	const record = await Otp.findOne({ mobile, otp, role: 'banquetadmin' });
	if (record) {
		await Otp.deleteMany({ mobile, role: 'banquetadmin' });
		const token = generateToken({ mobile, role: 'banquetadmin' });
		return res.json({ message: 'Banquet admin OTP verified.', token });
	}
	res.status(401).json({ error: 'Invalid OTP' });
}

// Google Login controllers (stubs)
export function googleLogin (req, res) {
    // TODO: Implement Google OAuth login initiation
    res.json({ message: 'Google login initiated.' });
}

export function googleCallback (req, res) {
    // TODO: Handle Google OAuth callback, authenticate user, create session/token
    res.json({ message: 'Google login callback handled.' });
}
