const express = require("express");
const {
  register,
  login,
  adminLogin,
  getAllUsers,
  approvePayment,
  setSubscription,
  setAdmin,
  submitContact,
  getAllContacts,
  forgotPassword,
  resetPassword,
  verifyAdminSecretKey,
  createSubAdmin,
  approveSubAdmin,
  getSubAdmins,
  updateUserRole,
  deleteUser,
  // Approval request controllers
  createApprovalRequest,
  getAllApprovalRequests,
  getPendingApprovalRequests,
  reviewApprovalRequest,
  getMyApprovalRequests
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.get("/admin/users", getAllUsers);
router.post('/admin/users/:userId/approve-payment', approvePayment);
router.post('/admin/users/:userId/set-subscription', setSubscription);
router.post('/admin/users/:userId/set-admin', setAdmin);
router.delete('/admin/users/:userId', deleteUser);
router.post("/contact", submitContact);
router.get("/admin/contacts", getAllContacts);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/verify-admin-key", verifyAdminSecretKey);

// New role-based admin routes
router.get("/admin/sub-admins", getSubAdmins);
router.post('/admin/users/:userId/create-sub-admin', createSubAdmin);
router.post('/admin/users/:userId/approve-sub-admin', approveSubAdmin);
router.post('/admin/users/:userId/update-role', updateUserRole);

// Approval request routes
router.post('/approval-requests', createApprovalRequest);
router.get('/admin/approval-requests', getAllApprovalRequests);
router.get('/admin/approval-requests/pending', getPendingApprovalRequests);
router.post('/admin/approval-requests/:requestId/review', reviewApprovalRequest);
router.get('/approval-requests/:userId', getMyApprovalRequests);

module.exports = router;
