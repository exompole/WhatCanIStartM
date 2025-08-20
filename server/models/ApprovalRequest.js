const mongoose = require("mongoose");

const approvalRequestSchema = new mongoose.Schema({
  // Who made the request
  requestedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // What type of action needs approval
  actionType: { 
    type: String, 
    enum: ['payment_approval', 'subscription_change', 'user_deletion', 'role_change', 'other'],
    required: true 
  },
  
  // Target user (if applicable)
  targetUser: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  
  // Details of the request
  requestDetails: {
    type: String,
    required: true
  },
  
  // Additional data for the request
  requestData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Status of the request
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  
  // Who approved/rejected (super admin)
  reviewedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  
  // When it was reviewed
  reviewedAt: { 
    type: Date 
  },
  
  // Comments from super admin
  reviewComments: { 
    type: String 
  },
  
  // Priority level
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'], 
    default: 'medium' 
  }
}, {
  timestamps: true
});

// Index for efficient querying
approvalRequestSchema.index({ status: 1, requestedBy: 1 });
approvalRequestSchema.index({ actionType: 1, status: 1 });

module.exports = mongoose.model("ApprovalRequest", approvalRequestSchema);
