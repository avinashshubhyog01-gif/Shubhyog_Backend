import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
mobile: {
  type: String,
  unique: true, // ✅ OK
  required: true
},
  name: { type: String },
  role: { type: String, enum: ['superadmin', 'banquetadmin', 'user'], required: true },
  // Add more fields as needed (email, address, etc.)
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;
