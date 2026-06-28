const express = require('express');
const Issue = require('../models/Issue');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all issues with location filtering
router.get('/issues', authenticateToken, async (req, res) => {
  try {
    const { location, sort } = req.query;
    let query = {};

    // Filter by location if provided
    if (location) {
      query.village = location;
    }

    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'likes') {
      sortOption = { likes: -1 };
    }

    const issues = await Issue.find(query)
      .sort(sortOption)
      .populate('reportedBy', 'name village')
      .populate('likedBy', 'name')
      .exec();

    res.json({ issues });
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new issue
router.post('/issues', authenticateToken, upload.single('media'), async (req, res) => {
  try {
    const { title, description, category, village, location } = req.body;
    
    // Handle uploaded file
    let mediaUrl = '';
    if (req.file) {
      mediaUrl = `/uploads/${req.file.filename}`;
    }

    const issue = new Issue({
      title,
      description,
      category,
      village,
      mediaUrl,
      location,
      reportedBy: req.user._id
    });

    await issue.save();

    // Emit notification to government officials
    const io = req.app.get('io');
    if (io) {
      io.to('government-officials').emit('new-issue', {
        id: issue._id,
        title: issue.title,
        village: issue.village,
        category: issue.category
      });
    }

    res.status(201).json({
      message: 'Issue reported successfully',
      issue
    });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get my issues
router.get('/my-issues/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user owns this resource
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const issues = await Issue.find({ reportedBy: userId })
      .sort({ createdAt: -1 })
      .populate('reportedBy', 'name village')
      .exec();

    res.json({ issues });
  } catch (error) {
    console.error('Get my issues error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Like/Unlike issue
router.post('/issues/:id/like', authenticateToken, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    const userId = req.user._id;
    const likedIndex = issue.likedBy.findIndex(id => id.toString() === userId.toString());

    if (likedIndex > -1) {
      // Unlike
      issue.likedBy.splice(likedIndex, 1);
      issue.likes -= 1;
    } else {
      // Like
      issue.likedBy.push(userId);
      issue.likes += 1;
    }

    await issue.save();

    res.json({
      message: likedIndex > -1 ? 'Unliked' : 'Liked',
      likes: issue.likes
    });
  } catch (error) {
    console.error('Like issue error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add comment
router.post('/issues/:id/comment', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const issue = await Issue.findById(req.params.id);
    
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    issue.comments.push({
      user: req.user._id,
      text
    });

    await issue.save();
    await issue.populate('comments.user', 'name');

    res.json({
      message: 'Comment added',
      comment: issue.comments[issue.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

