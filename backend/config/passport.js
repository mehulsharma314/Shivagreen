import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js"; // adjust path

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          isGoogleUser: true,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default passport;
