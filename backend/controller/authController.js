import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Register
export const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Check if user exists
const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If user signed up with Google, prevent manual login
    if (user.isGoogleUser) {
      return res.status(400).json({ message: "Please login using Google authentication" });
    }

    // Check if user has password
    if (!user.password) {
      return res.status(400).json({ message: "Password not set for this user" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      return res.status(200).json({ message: "Login successful", token: token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Logout
export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('UserId from token:', userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      gender: user.gender,
      email: user.email,
      mobile: user.mobile, 
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// PUT /api/user/profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, gender, email, mobile } = req.body;

    user.name = name || user.name;
    user.gender = gender || user.gender;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;

    await user.save();

    res.json({ message: 'Profile updated successfully',user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
