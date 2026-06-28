# ✅ Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## 📋 Pre-Deployment

- [ ] All files are saved
- [ ] Tested locally - everything works
- [ ] `.env` file is NOT committed (in .gitignore)
- [ ] All dependencies are in `package.json`

## 🔧 Git Setup

- [ ] Git repository initialized (`git init`)
- [ ] All files added (`git add .`)
- [ ] Initial commit made (`git commit -m "..."`)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub (`git push`)

## 🌐 Render.com Setup

- [ ] Account created on Render.com
- [ ] GitHub connected to Render
- [ ] Web Service created
- [ ] Environment variables set:
  - [ ] `NODE_ENV = production`
  - [ ] `PORT = 5000`
  - [ ] `MONGODB_URI = (your MongoDB connection string)`
  - [ ] `JWT_SECRET = (secure random string)`

## 💾 Database Setup

- [ ] MongoDB Atlas account created (or Render MongoDB)
- [ ] Database cluster created
- [ ] Connection string copied
- [ ] Network access configured (allow all IPs for testing)

## 🚀 Deployment

- [ ] Service deployed successfully
- [ ] Build completed without errors
- [ ] Server running (check logs)

## ✅ Post-Deployment Testing

- [ ] Visit deployed URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test issue reporting
- [ ] Test photo/video upload
- [ ] Test language switching (Telugu/English)
- [ ] Test like functionality
- [ ] Test comment functionality
- [ ] Test government dashboard
- [ ] Test status updates
- [ ] Test real-time notifications

## 🐛 Troubleshooting

- [ ] Check Render logs for errors
- [ ] Verify MongoDB connection
- [ ] Check environment variables
- [ ] Test file uploads working
- [ ] Verify Socket.IO connections

---

**Once all items are checked, your app is ready!** ✅

