const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Tìm hoặc tạo người dùng
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.emails[0].value.split('@')[0],
          email: profile.emails[0].value,
          fullName: profile.displayName,
          isEmailVerified: true,
          isActive: true,
          role: 'user'
        });

        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

module.exports = passport;