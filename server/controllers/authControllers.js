// -------------------- Verify Admin Secret Key --------------------
const verifyAdminSecretKey = (req, res) => {
  const { key } = req.body;
  if (key === ADMIN_SECRET_KEY) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: "Invalid secret key" });
};

const User = require("../models/User");
const Contact = require("../models/Contact");
const ApprovalRequest = require("../models/ApprovalRequest");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const ResetToken = require("../models/ResetToken");

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PHONE = process.env.ADMIN_PHONE;

// -------------------- Register User --------------------
const register = async (req, res) => {
  const { username, firstname, surname, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      firstname,
      surname,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// -------------------- Login User --------------------
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// -------------------- Admin Login --------------------
const adminLogin = async (req, res) => {
  const { key, email, password } = req.body;

  try {
    if (key !== ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid admin key" });
    }

    let admin = await User.findOne({ email });

    if (!admin) {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        admin = new User({
          username: ADMIN_USERNAME,
          firstname: "Super",
          surname: "Admin",
          email: ADMIN_EMAIL,
          phone: ADMIN_PHONE,
          password: hashedPassword,
          role: 'super-admin',
          isApproved: true,
        });

        await admin.save();
        return res
          .status(201)
          .json({ message: "Super admin created and logged in", user: admin });
      } else {
        return res.status(404).json({
          message: "Admin not found and credentials do not match setup",
        });
      }
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Admin login successful", user: admin });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error during admin login" });
  }
};

// -------------------- Submit Contact --------------------
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// -------------------- Get All Contacts --------------------
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

// -------------------- Get All Users --------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate('approvedBy', 'firstname surname email').populate('createdBy', 'firstname surname email');
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// -------------------- Approve Payment --------------------
const approvePayment = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.paymentStatus = 'approved';
    // If subscription previously pending, do not change subscription here
    await user.save();
    res.json({ message: 'Payment approved', user });
  } catch (err) {
    console.error('Error approving payment', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------- Set Subscription Tag --------------------
const setSubscription = async (req, res) => {
  const { userId } = req.params;
  // expected 'Basic' or 'Pro' or 'Free'
  console.log(`SET-SUBSCRIPTION called: ${req.method} ${req.originalUrl}`);
  console.log('Request body:', req.body);
  const { plan } = req.body || {};
  if (!['Free', 'Basic', 'Pro'].includes(plan)) return res.status(400).json({ message: 'Invalid plan' });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.subscription = plan;
    // If setting a paid plan, and paymentStatus was none, mark pending
    if (plan !== 'Free' && user.paymentStatus === 'none') user.paymentStatus = 'pending';
    await user.save();
    res.json({ message: 'Subscription updated', user });
  } catch (err) {
    console.error('Error setting subscription', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------- Set Admin Role --------------------
const setAdmin = async (req, res) => {
  const { userId } = req.params;
  const { isAdmin } = req.body; // expected boolean
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isAdmin = !!isAdmin;
    await user.save();
    res.json({ message: 'User admin status updated', user });
  } catch (err) {
    console.error('Error setting admin status', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------- Create Sub Admin --------------------
const createSubAdmin = async (req, res) => {
  const { username, firstname, surname, email, phone, password } = req.body;
  const { userId: creatorId } = req.params; // ID of the super admin creating the sub admin

  try {
    // Check if creator is admin or super admin
    const creator = await User.findById(creatorId);
    if (!creator || (creator.role !== 'super-admin' && creator.role !== 'admin')) {
      return res.status(403).json({ message: 'Only admins or super admins can create sub admins' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const subAdmin = new User({
      username,
      firstname,
      surname,
      email,
      phone,
      password: hashedPassword,
      role: 'sub-admin',
      isApproved: false, // Requires approval from super admin
      createdBy: creatorId,
    });

    await subAdmin.save();
    res.status(201).json({ message: 'Sub admin created successfully. Pending approval.', user: subAdmin });
  } catch (error) {
    console.error('Error creating sub admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------- Approve Sub Admin --------------------
const approveSubAdmin = async (req, res) => {
  const { userId } = req.params;
  const { approvedBy } = req.body; // ID of the super admin approving

  try {
    // Check if approver is super admin
    const approver = await User.findById(approvedBy);
    if (!approver || approver.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can approve sub admins' });
    }

    const subAdmin = await User.findById(userId);
    if (!subAdmin) {
      return res.status(404).json({ message: 'Sub admin not found' });
    }

    if (subAdmin.role !== 'sub-admin') {
      return res.status(400).json({ message: 'User is not a sub admin' });
    }

    subAdmin.isApproved = true;
    subAdmin.approvedBy = approvedBy;
    subAdmin.approvedAt = new Date();
    await subAdmin.save();

    res.json({ message: 'Sub admin approved successfully', user: subAdmin });
  } catch (error) {
    console.error('Error approving sub admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------- Get Sub Admins --------------------
const getSubAdmins = async (req, res) => {
  try {
    const subAdmins = await User.find({ role: 'sub-admin' })
      .select('-password')
      .populate('approvedBy', 'firstname surname email')
      .populate('createdBy', 'firstname surname email');
    res.status(200).json(subAdmins);
  } catch (error) {
    console.error('Error fetching sub admins:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------- Update User Role --------------------
const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role, updatedBy } = req.body;

  try {
    // Check if updater is super admin
    const updater = await User.findById(updatedBy);
    if (!updater || updater.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can update user roles' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent changing super admin role
    if (user.role === 'super-admin') {
      return res.status(403).json({ message: 'Cannot modify super admin role' });
    }

    user.role = role;
    
    // If promoting to sub-admin, set approval status
    if (role === 'sub-admin') {
      user.isApproved = false;
      user.createdBy = updatedBy;
    } else {
      user.isApproved = true;
    }

    await user.save();
    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// -------------------- Delete User --------------------
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting super admin
    if (user.role === 'super-admin') {
      return res.status(403).json({ message: 'Cannot delete super admin' });
    }

    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//-----------------------ForgotPassword----------------------//

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("ForgotPassword - Request received for email:", email);
  try {
    const user = await User.findOne({ email });
    console.log("ForgotPassword - User found:", user ? "Yes" : "No");
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    console.log("ForgotPassword - Generated token:", token);
    await new ResetToken({ userId: user._id, token }).save();
    console.log("ForgotPassword - ResetToken saved to database");

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    console.log("ForgotPassword - Reset link:", resetLink);

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("Email configuration missing. Reset link:", resetLink);
      return res.json({ 
        message: "Password reset link generated. Check server logs for the link.",
        resetLink: resetLink 
      });
    }

    // Send email (use nodemailer)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: "Password reset link sent to email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//......................ResetPassword---------------------//

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken) return res.status(400).json({ message: "Invalid or expired token" });

    // Check if token is expired (1 hour)
    const tokenAge = Date.now() - resetToken.createdAt.getTime();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (tokenAge > oneHour) {
      await ResetToken.deleteOne({ _id: resetToken._id });
      return res.status(400).json({ message: "Token has expired. Please request a new password reset." });
    }

    const user = await User.findById(resetToken.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await ResetToken.deleteOne({ _id: resetToken._id });

    res.json({ message: "Password reset successfully." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// -------------------- Approval Request Controllers --------------------

// Create approval request (for sub-admins)
const createApprovalRequest = async (req, res) => {
  const { requestedBy, actionType, targetUser, requestDetails, requestData, priority } = req.body;

  try {
    // Verify the requester is a sub-admin
    const requester = await User.findById(requestedBy);
    if (!requester || requester.role !== 'sub-admin') {
      return res.status(403).json({ message: 'Only sub-admins can create approval requests' });
    }

    const approvalRequest = new ApprovalRequest({
      requestedBy,
      actionType,
      targetUser,
      requestDetails,
      requestData,
      priority: priority || 'medium'
    });

    await approvalRequest.save();

    res.status(201).json({ 
      message: 'Approval request created successfully',
      requestId: approvalRequest._id 
    });
  } catch (error) {
    console.error('Create approval request error:', error);
    res.status(500).json({ error: 'Server error creating approval request' });
  }
};

// Get all approval requests (for super admin)
const getAllApprovalRequests = async (req, res) => {
  try {
    const requests = await ApprovalRequest.find()
      .populate('requestedBy', 'firstname surname email')
      .populate('targetUser', 'firstname surname email')
      .populate('reviewedBy', 'firstname surname')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Get approval requests error:', error);
    res.status(500).json({ error: 'Server error fetching approval requests' });
  }
};

// Get pending approval requests (for super admin)
const getPendingApprovalRequests = async (req, res) => {
  try {
    const requests = await ApprovalRequest.find({ status: 'pending' })
      .populate('requestedBy', 'firstname surname email')
      .populate('targetUser', 'firstname surname email')
      .sort({ priority: -1, createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Get pending approval requests error:', error);
    res.status(500).json({ error: 'Server error fetching pending requests' });
  }
};

// Review approval request (super admin only)
const reviewApprovalRequest = async (req, res) => {
  const { requestId } = req.params;
  const { status, reviewComments, reviewedBy } = req.body;

  try {
    // Verify the reviewer is a super admin
    const reviewer = await User.findById(reviewedBy);
    if (!reviewer || reviewer.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only super admins can review approval requests' });
    }

    const approvalRequest = await ApprovalRequest.findById(requestId);
    if (!approvalRequest) {
      return res.status(404).json({ message: 'Approval request not found' });
    }

    if (approvalRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request has already been reviewed' });
    }

    // Update the request
    approvalRequest.status = status;
    approvalRequest.reviewedBy = reviewedBy;
    approvalRequest.reviewedAt = new Date();
    approvalRequest.reviewComments = reviewComments;

    await approvalRequest.save();

    // If approved, execute the requested action
    if (status === 'approved') {
      await executeApprovedAction(approvalRequest);
    }

    res.json({ 
      message: `Request ${status} successfully`,
      request: approvalRequest 
    });
  } catch (error) {
    console.error('Review approval request error:', error);
    res.status(500).json({ error: 'Server error reviewing request' });
  }
};

// Execute approved action
const executeApprovedAction = async (approvalRequest) => {
  try {
    switch (approvalRequest.actionType) {
      case 'payment_approval':
        if (approvalRequest.targetUser) {
          const user = await User.findById(approvalRequest.targetUser);
          if (user) {
            user.paymentStatus = 'approved';
            await user.save();
          }
        }
        break;
      
      case 'subscription_change':
        if (approvalRequest.targetUser && approvalRequest.requestData.newSubscription) {
          const user = await User.findById(approvalRequest.targetUser);
          if (user) {
            user.subscription = approvalRequest.requestData.newSubscription;
            await user.save();
          }
        }
        break;
      
      case 'user_deletion':
        if (approvalRequest.targetUser) {
          await User.findByIdAndDelete(approvalRequest.targetUser);
        }
        break;
      
      case 'role_change':
        if (approvalRequest.targetUser && approvalRequest.requestData.newRole) {
          const user = await User.findById(approvalRequest.targetUser);
          if (user) {
            user.role = approvalRequest.requestData.newRole;
            await user.save();
          }
        }
        break;
      
      default:
        console.log('Unknown action type:', approvalRequest.actionType);
    }
  } catch (error) {
    console.error('Error executing approved action:', error);
  }
};

// Get approval requests by requester (for sub-admins)
const getMyApprovalRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await ApprovalRequest.find({ requestedBy: userId })
      .populate('targetUser', 'firstname surname email')
      .populate('reviewedBy', 'firstname surname')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Get my approval requests error:', error);
    res.status(500).json({ error: 'Server error fetching requests' });
  }
};

// -------------------- Export All --------------------
module.exports = {
  register,
  login,
  adminLogin,
  getAllUsers,
  submitContact,
  getAllContacts,
  forgotPassword,
  resetPassword,
  verifyAdminSecretKey,
  approvePayment,
  setSubscription,
  setAdmin,
  createSubAdmin,
  approveSubAdmin,
  getSubAdmins,
  updateUserRole,
  deleteUser,
  // Approval request exports
  createApprovalRequest,
  getAllApprovalRequests,
  getPendingApprovalRequests,
  reviewApprovalRequest,
  getMyApprovalRequests,
};


