/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    secret,
    { expiresIn: '7d' }
  );
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'A user with that email already exists' });
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      message: 'User registered successfully',
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', details: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', details: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { userId, email, currentPassword, newPassword } = req.body;
  console.log('update-password payload:', req.body);

  if ((!userId && !email) || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'userId/email, currentPassword, and newPassword are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters long' });
  }

  try {
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const hasValidUserId = typeof userId === 'string' && mongoose.Types.ObjectId.isValid(userId);

    const lookup = hasValidUserId
      ? { _id: userId }
      : normalizedEmail
        ? { email: normalizedEmail }
        : null;

    if (!lookup) {
      return res.status(400).json({ message: 'Provide a valid userId or email' });
    }

    const user = await User.findOne(lookup);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('update-password error:', error);
    return res.status(500).json({ message: 'Server error', details: error.message });
  }
};

module.exports = { register, login, updatePassword };
