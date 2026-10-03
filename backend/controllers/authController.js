import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';

// Resilient memory store for development when MongoDB Atlas is offline
const memoryUsers = new Map();

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, preferences } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters in length.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Ensure MongoDB connection is established in serverless environment
    await connectDB();

    // 1. Try MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      const user = await User.create({
        name: name.trim(),
        email: cleanEmail,
        password,
        preferences: preferences || {}
      });

      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        message: 'Registration successful.',
        data: {
          token,
          user: user.toJSON()
        }
      });
    }

    // 2. Resilient Fallback Memory Store (Development)
    if (memoryUsers.has(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      preferences: {
        defaultLocation: 'New Delhi',
        mode: 'Student',
        activity: 'College',
        commuteType: 'Public Transit',
        sensitiveAirQuality: false,
        notificationAlerts: true,
        ...(preferences || {})
      },
      createdAt: new Date().toISOString()
    };

    memoryUsers.set(cleanEmail, newUser);
    const token = generateToken(newUser);

    const sanitizedUser = { ...newUser };
    delete sanitizedUser.password;

    return res.status(201).json({
      success: true,
      message: 'Registration successful (Session active).',
      data: {
        token,
        user: sanitizedUser
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Ensure MongoDB connection is established in serverless environment
    await connectDB();

    // 1. Try MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password credentials.'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password credentials.'
        });
      }

      const token = generateToken(user);

      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        data: {
          token,
          user: user.toJSON()
        }
      });
    }

    // 2. Resilient Fallback Memory Store (Development)
    const memUser = memoryUsers.get(cleanEmail);
    if (!memUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.'
      });
    }

    const isMatch = await bcrypt.compare(password, memUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.'
      });
    }

    const token = generateToken(memUser);
    const sanitizedUser = { ...memUser };
    delete sanitizedUser.password;

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user: sanitizedUser
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    await connectDB();
    if (mongoose.connection.readyState === 1 && req.user?.id) {
      const user = await User.findById(req.user.id);
      if (user) {
        return res.status(200).json({
          success: true,
          data: user.toJSON()
        });
      }
    }

    // Memory fallback
    const memUser = memoryUsers.get(req.user?.email);
    if (memUser) {
      const sanitized = { ...memUser };
      delete sanitized.password;
      return res.status(200).json({
        success: true,
        data: sanitized
      });
    }

    return res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user preferences
 * @route   PUT /api/auth/preferences
 * @access  Private
 */
export const updatePreferences = async (req, res, next) => {
  try {
    const { preferences } = req.body;

    if (!preferences || typeof preferences !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Preferences payload is required.'
      });
    }

    await connectDB();
    if (mongoose.connection.readyState === 1 && req.user?.id) {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { preferences } },
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Preferences updated successfully.',
        data: user.toJSON()
      });
    }

    // Memory fallback
    const memUser = memoryUsers.get(req.user?.email);
    if (memUser) {
      memUser.preferences = { ...memUser.preferences, ...preferences };
      const sanitized = { ...memUser };
      delete sanitized.password;
      return res.status(200).json({
        success: true,
        message: 'Preferences updated successfully.',
        data: sanitized
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Preferences updated.',
      data: { preferences }
    });
  } catch (error) {
    next(error);
  }
};
