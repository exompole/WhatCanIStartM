const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config(); 

exports.register = async (req, res) => {
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

exports.login = async (req, res) => {
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





const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PHONE = process.env.ADMIN_PHONE;

exports.adminLogin = async (req, res) => {
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
        return res.status(201).json({ message: "Admin created and logged in", user: admin });
      } else {
        return res.status(404).json({ message: "Admin not found and credentials do not match setup" });
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


