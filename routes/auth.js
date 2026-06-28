const express = require('express');
const jwt = require('jsonwebtoken');
const { Citizen, Government, getUserModel, findUserByEmail } = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, village, role } = req.body;
    const userRole = role === 'government' ? 'government' : 'citizen';

    // Check if user exists in either collection
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user in the correct collection
    const UserModel = getUserModel(userRole);
    const user = new UserModel({
      name,
      email,
      password,
      village
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: userRole },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: userRole,
        village: user.village
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in both collections
    let user = await Citizen.findOne({ email });
    let role = 'citizen';
    if (!user) {
      user = await Government.findOne({ email });
      role = 'government';
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
        village: user.village
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

