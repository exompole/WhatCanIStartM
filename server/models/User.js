const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  // subscription fields for admin dashboard
  subscription: { type: String, enum: ['Free', 'Basic', 'Pro'], default: 'Free' },
  paymentStatus: { type: String, enum: ['none', 'pending', 'approved'], default: 'none' },
  // Role-based access control
  role: { 
    type: String, 
    enum: ['user', 'sub-admin', 'admin', 'super-admin'], 
    default: 'user' 
  },
  // For sub-admins: approval status
  isApproved: { type: Boolean, default: false },
  // For sub-admins: who approved them
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  // For sub-admins: who created them
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  // Legacy field for backward compatibility
  isAdmin: { type: Boolean, default: false },
}, {
  timestamps: true
});

// Virtual for backward compatibility
userSchema.virtual('isAdminLegacy').get(function() {
  return this.role === 'admin' || this.role === 'super-admin' || this.role === 'sub-admin';
});

module.exports = mongoose.model("User", userSchema);

