const express = require("express");
const router= express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register",async (req, res) => {
  try {
    const { username, email,password}= req.body;

    // Check if user already exists
    let user = await User.findOne({ $or:[{ email }, { username }] });
    if (user) {
      return res.status(400).json({message: "User already exists" });
    }

    // Create new user
    user =new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    // Save user
    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn:"1d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req,res) => {
  try {
    const { username, password }= req.body;

    // Check if user exists
    const user = await User.findOne({username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials"});
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id},
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email:user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error" });
  }
});

module.exports = router;
