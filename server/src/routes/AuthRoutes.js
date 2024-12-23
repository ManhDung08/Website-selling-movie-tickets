const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/AuthController');
const { registerUserValidation, loginValidation } = require('../middleware/validation/UserValidation');

router.post('/register', registerUserValidation, authController.register);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/login', loginValidation, authController.login);

router.get('/google', 
    passport.authenticate('google', { 
      scope: ['profile', 'email'] 
    })
);
  
// Callback sau khi xác thực
router.get('/google/callback', 
    passport.authenticate('google', { 
      failureRedirect: '/login' 
    }),
    (req, res) => {
      // Tạo token JWT
      const token = AuthService.generateToken(req.user._id, req.user.role);
      
      // Redirect hoặc response token
      res.redirect(`/dashboard?token=${token}`);
    }
);

module.exports = router;