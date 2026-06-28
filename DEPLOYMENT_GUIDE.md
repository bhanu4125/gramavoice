# 🚀 GramaVoice Deployment Guide

This guide will help you deploy your GramaVoice application to a cloud platform.

## 📋 Prerequisites

1. GitHub account (for version control)
2. Account on a hosting platform (we'll use **Render.com** - free tier available)

---

## 🌐 Recommended Platforms

### Option 1: Render.com (Recommended - Free Tier)
- Free MongoDB database
- Free web service hosting
- Easy setup
- Auto-deploy from GitHub

### Option 2: Railway.app
- Modern platform
- Auto-deploy from GitHub
- MongoDB available

### Option 3: Heroku
- Well-established platform
- Requires credit card for MongoDB addon (free tier limited)

---

## 📝 Step-by-Step Deployment (Render.com)

### Step 1: Prepare Your Project

1. **Create `.env.production` file** (already done)
2. **Ensure all files are committed to Git**

### Step 2: Create GitHub Repository

```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial commit - GramaVoice app"
git branch -M main

# Create repo on GitHub, then:
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3: Deploy to Render

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `gramavoice`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. **Add Environment Variables**:
   - `PORT` = `5000` (or leave default)
   - `MONGODB_URI` = Your MongoDB connection string
   - `JWT_SECRET` = Your secret key (generate a long random string)

6. Click **"Create Web Service"**

### Step 4: Setup MongoDB Database

#### Option A: MongoDB Atlas (Free)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (free tier M0)
4. Get connection string
5. Add to Render environment variables

#### Option B: Render MongoDB (Free)
1. In Render dashboard, click **"New +"** → **"MongoDB"**
2. Name it `gramavoice-db`
3. Copy connection string
4. Add to your web service environment variables

---

## 🔧 Required Deployment Files

All files are already created:
- ✅ `package.json` - Dependencies
- ✅ `server.js` - Main server file
- ✅ `.gitignore` - Ignore node_modules, .env
- ✅ `render.yaml` (optional) - Render configuration

---

## 🌍 Environment Variables for Production

Update these in your hosting platform:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gramavoice?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-long-random-string-change-this-in-production
NODE_ENV=production
```

---

## 📁 Important Files for Deployment

- `server.js` - Main application
- `package.json` - Dependencies
- `public/` - Frontend files
- `routes/` - API routes
- `models/` - Database models
- `middleware/` - Authentication & upload

---

## ✅ Post-Deployment Checklist

1. ✅ Test login functionality
2. ✅ Test file uploads (photos/videos)
3. ✅ Test language switching
4. ✅ Verify MongoDB connection
5. ✅ Test citizen dashboard
6. ✅ Test government dashboard
7. ✅ Check real-time notifications

---

## 🔗 Your Deployed URLs

After deployment, you'll get:
- **Main App**: `https://your-app-name.onrender.com`
- **API**: `https://your-app-name.onrender.com/api`

---

## 🐛 Troubleshooting

### Server won't start
- Check environment variables are set
- Verify MongoDB connection string
- Check server logs in Render dashboard

### File uploads not working
- Ensure `/uploads` directory exists (created automatically)
- Check file permissions

### Database connection errors
- Verify MongoDB connection string
- Check MongoDB Atlas network access (whitelist IP)

---

## 📞 Need Help?

Check Render logs:
1. Go to Render dashboard
2. Click on your service
3. View "Logs" tab

---

**Ready to deploy? Follow the steps above!** 🚀

