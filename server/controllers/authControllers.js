const User = require("../models/User");
const Contact = require("../models/Contact");
const bcrypt = require("bcryptjs");
require("dotenv").config();
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
          firstname: "Admin",
          surname: "User",
          email: ADMIN_EMAIL,
          phone: ADMIN_PHONE,
          password: hashedPassword,
        });

        await admin.save();
        return res
          .status(201)
          .json({ message: "Admin created and logged in", user: admin });
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
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

//-----------------------ForgotPassword----------------------//

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    await new ResetToken({ userId: user._id, token }).save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;

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



// -------------------- Export All --------------------
module.exports = {
  forgotPassword,
  register,
  login,
  adminLogin,
  getAllUsers,
  submitContact,
  getAllContacts,
  forgotPassword,
  resetPassword,
};


