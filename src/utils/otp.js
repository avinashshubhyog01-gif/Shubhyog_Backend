// utils/otp.js
import axios from 'axios';

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY; // Set this in your .env file
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'SHUBYG';
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID; // Set this in your .env file

function generateOtp(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString().substring(0, length);
}

async function sendOtpMsg91(mobile, otp) {
  const url = `https://api.msg91.com/api/v5/otp?template_id=${MSG91_TEMPLATE_ID}&mobile=${mobile}&authkey=${MSG91_AUTH_KEY}&otp=${otp}&sender=${MSG91_SENDER_ID}`;
  try {
    const response = await get(url);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export default { generateOtp, sendOtpMsg91 };
