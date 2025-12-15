import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  otp: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 30 } // expires after 30 seconds
});

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;
