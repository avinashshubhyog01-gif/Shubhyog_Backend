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
		// Save new OTP in database
		await Otp.create({ mobile, otp, role: 'superadmin' });
		
		// Try to send OTP via SMS, but don't fail if SMS service is not configured
		try {
			await sendOtpMsg91(mobile, otp);
			console.log(`✅ OTP sent via SMS to ${mobile}: ${otp}`);
		} catch (smsError) {
			console.log(`⚠️ SMS service not configured. OTP for ${mobile}: ${otp}`);
		}
		
		res.json({ message: 'OTP sent to super admin.' });
	} catch (err) {
		console.error('Error in requestSuperAdminOtp:', err);
		res.status(500).json({ error: 'Failed to generate OTP', details: err.message });
	}
}

export async function verifySuperAdminOtp (req, res) {
	const { mobile, otp } = req.body;
	if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP required' });
	
	try {
		const record = await Otp.findOne({ mobile, otp, role: 'superadmin' });
		if (record) {
			await Otp.deleteMany({ mobile, role: 'superadmin' });
			const token = generateToken({ mobile, role: 'superadmin' });
			console.log(`✅ OTP verified for ${mobile}`);
			return res.json({ message: 'Super admin OTP verified.', token });
		}
		console.log(`❌ Invalid OTP for ${mobile}`);
		res.status(401).json({ error: 'Invalid OTP' });
	} catch (err) {
		console.error('Error in verifySuperAdminOtp:', err);
		res.status(500).json({ error: 'Failed to verify OTP', details: err.message });
	}
}

// Banquet Admin OTP login controllers
export async function requestBanquetAdminOtp (req, res) {
	const { mobile } = req.body;
	if (!mobile) return res.status(400).json({ error: 'Mobile number required' });
	const otp = generateOtp();
	try {
		await Otp.deleteMany({ mobile, role: 'banquetadmin' });
		await Otp.create({ mobile, otp, role: 'banquetadmin' });
		
		// Try to send OTP via SMS, but don't fail if SMS service is not configured
		try {
			await sendOtpMsg91(mobile, otp);
			console.log(`✅ OTP sent via SMS to ${mobile}: ${otp}`);
		} catch (smsError) {
			console.log(`⚠️ SMS service not configured. OTP for ${mobile}: ${otp}`);
		}
		
		res.json({ message: 'OTP sent to banquet admin.' });
	} catch (err) {
		console.error('Error in requestBanquetAdminOtp:', err);
		res.status(500).json({ error: 'Failed to generate OTP', details: err.message });
	}
}

export async function verifyBanquetAdminOtp (req, res) {
	const { mobile, otp } = req.body;
	if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP required' });
	
	try {
		const record = await Otp.findOne({ mobile, otp, role: 'banquetadmin' });
		if (record) {
			await Otp.deleteMany({ mobile, role: 'banquetadmin' });
			const token = generateToken({ mobile, role: 'banquetadmin' });
			console.log(`✅ OTP verified for ${mobile}`);
			return res.json({ message: 'Banquet admin OTP verified.', token });
		}
		console.log(`❌ Invalid OTP for ${mobile}`);
		res.status(401).json({ error: 'Invalid OTP' });
	} catch (err) {
		console.error('Error in verifyBanquetAdminOtp:', err);
		res.status(500).json({ error: 'Failed to verify OTP', details: err.message });
	}
}

// Google Login controllers
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleLogin (req, res) {
    const { tokenId, role } = req.body;
    
    if (!tokenId || !role) {
        return res.status(400).json({ error: 'Token ID and role required' });
    }

    if (!['superadmin', 'banquetadmin'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name;
        
        // TODO: Check if user exists in DB, create if not
        // For now, just generate JWT token
        const token = generateToken({ email, name, role });
        
        res.json({ 
            message: 'Google login successful',
            token,
            user: { email, name, role }
        });
    } catch (error) {
        console.error('Google token verification failed:', error);
        res.status(401).json({ error: 'Invalid Google token' });
    }
}

export function googleCallback (req, res) {
    // Keep for backward compatibility if needed
    res.json({ message: 'Use POST /auth/google with tokenId instead' });
}
