const express = require('express');
const Issue = require('../models/Issue');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Apply authentication and role check to all routes
router.use(authenticateToken);
router.use(requireRole(['government']));

// Get all issues with filters
router.get('/issues', async (req, res) => {
  try {
    const { sort, location, category, status } = req.query;
    let query = {};

    // Apply filters
    if (location) query.village = location;
    if (category) query.category = category;
    if (status) query.status = status;

    // Sort options
    let sortOption = {};
    if (sort === 'likes') {
      sortOption = { likes: -1 };
    } else if (sort === 'recent') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'location') {
      sortOption = { village: 1, createdAt: -1 };
    } else {
      sortOption = { likes: -1, createdAt: -1 }; // Default: priority + recent
    }

    const issues = await Issue.find(query)
      .sort(sortOption)
      .populate('reportedBy', 'name village email')
      .populate('likedBy', 'name')
      .populate('comments.user', 'name')
      .exec();

    res.json({ issues });
  } catch (error) {
    console.error('Get gov issues error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get issue by ID
router.get('/issues/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('reportedBy', 'name village email')
      .populate('likedBy', 'name')
      .populate('comments.user', 'name');

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.json({ issue });
  } catch (error) {
    console.error('Get issue by ID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update issue status
router.patch('/issues/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Reported', 'Under Review', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('reportedBy', 'name village');

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.json({
      message: 'Status updated',
      issue
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Assign officer
router.patch('/issues/:id/assign', async (req, res) => {
  try {
    const { assignedTo, remarks } = req.body;

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { assignedTo, remarks },
      { new: true }
    ).populate('reportedBy', 'name village');

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.json({
      message: 'Assignment updated',
      issue
    });
  } catch (error) {
    console.error('Assign officer error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalIssues = await Issue.countDocuments();
    const reported = await Issue.countDocuments({ status: 'Reported' });
    const inProgress = await Issue.countDocuments({ status: 'In Progress' });
    const resolved = await Issue.countDocuments({ status: 'Resolved' });

    res.json({
      totalIssues,
      reported,
      inProgress,
      resolved
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

