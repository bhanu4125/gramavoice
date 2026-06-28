const jwt = require('jsonwebtoken');
const { Citizen, Government, getUserModel } = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    let user;
    let userRole = decoded.role;

    if (decoded.role) {
      const model = getUserModel(decoded.role);
      user = await model.findById(decoded.userId).select('-password');
    } else {
      user = await Citizen.findById(decoded.userId).select('-password');
      if (user) {
        userRole = 'citizen';
      } else {
        user = await Government.findById(decoded.userId).select('-password');
        userRole = user ? 'government' : undefined;
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    req.user.role = userRole;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  };
};

exports.JWT_SECRET = JWT_SECRET;

