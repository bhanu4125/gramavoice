const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"]
  }
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gramavoice';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const citizenRoutes = require('./routes/citizen');
const governmentRoutes = require('./routes/government');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', citizenRoutes);
app.use('/api/gov', governmentRoutes);

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/citizen-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'citizen-dashboard.html'));
});

app.get('/gov-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gov-dashboard.html'));
});

// Socket.IO for real-time notifications
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('join-officials', () => {
    socket.join('government-officials');
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

