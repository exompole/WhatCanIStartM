const express = require("express");
const {
  register,
  login,
  adminLogin,
  getAllUsers,
  submitContact,
  getAllContacts,
  forgotPassword,
  resetPassword
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.get("/admin/users", getAllUsers);
router.post("/contact", submitContact);
router.get("/admin/contacts", getAllContacts);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
