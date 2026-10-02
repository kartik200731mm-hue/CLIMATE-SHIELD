import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'climateshield_secure_jwt_secret_token_dev_2026';

/**
 * Protect routes - Verifies JWT Bearer token
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Try finding user in MongoDB if connected
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (dbErr) {
        // Fallback for memory store
        req.user = decoded;
      }

      if (!req.user) {
        req.user = decoded;
      }

      return next();
    } catch (error) {
      console.error('[Auth Error]', error.message);
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: Token is invalid or expired. Please sign in again.'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: No authentication token provided.'
    });
  }
};

/**
 * Sign JWT Token
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'user'
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};
