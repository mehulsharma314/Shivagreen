// backend/routes/authRoutes.js
import passport from 'passport';
import express from 'express';
import jwt from 'jsonwebtoken';
import { register, login, logout, getUserProfile, updateUserProfile } from '../controller/authController.js';
import { body } from 'express-validator';
import { OAuth2Client } from 'google-auth-library'; // Add this import
import User from '../models/userModel.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Make sure to set GOOGLE_CLIENT_ID in your .env

// Existing Google OAuth with Passport.js (for redirect flow)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    res.redirect(`${process.env.FRONTEND_URL}/google-success?token=${token}`);

  }
);

// New Google OAuth token verification (for frontend token POST flow)
router.post("/google", async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "No credential token provided" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    

    const { email, name, picture, sub } = payload; 

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        googleId: sub,
        avatar: picture,
        isGoogleAuth: true,
      });
      await user.save();
    } else {
      if (!user.isGoogleAuth) {
        user.isGoogleAuth = true;
        await user.save();
      }
    }

    // Create JWT with only id
    const token = jwt.sign(
      { id: user._id },  
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Google Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.avatar, 
      }
    });
  } catch (error) {
    console.error('Error verifying Google token', error);
    res.status(400).json({ message: "Invalid Google token" });
  }
});


// Registration, Login, and Logout routes
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], login);

router.post('/logout', logout);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
