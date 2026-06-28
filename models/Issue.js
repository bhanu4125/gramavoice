const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Road', 'Water', 'Electricity', 'Sanitation', 'Education', 'Healthcare', 'Other']
  },
  mediaUrl: {
    type: String
  },
  village: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    lat: { type: Number },
    lon: { type: Number }
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen'
  }],
  status: {
    type: String,
    enum: ['Reported', 'Under Review', 'In Progress', 'Resolved'],
    default: 'Reported'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  remarks: {
    type: String,
    trim: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen',
    required: true
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Citizen'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Issue', issueSchema);

