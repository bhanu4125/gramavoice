# 🚀 Quick Start Guide - GramaVoice

Follow these steps to get your GramaVoice application running in minutes!

## ⚡ Quick Setup

### 1. Prerequisites Check
Make sure you have installed:
- **Node.js** (v14 or higher) - Download from https://nodejs.org/
- **MongoDB** - Download from https://www.mongodb.com/try/download/community

### 2. Start MongoDB
Open a terminal and run:
```bash
# Windows (run as Administrator)
mongod

# Or if MongoDB is installed as a service:
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod --dbpath ~/data/db
```

### 3. Install & Run
In the project directory:
```bash
# Install dependencies (already done if you see node_modules folder)
npm install

# Start the server
npm start

# OR for auto-reload on file changes (development mode)
npm run dev
```

### 4. Access the Application
Open your browser and go to:
- **Main URL**: http://localhost:5000
- **Citizen Dashboard**: http://localhost:5000/citizen-dashboard (after login)
- **Government Dashboard**: http://localhost:5000/gov-dashboard (after login)

---

## 🧪 Testing the Application

### Step 1: Register as Citizen
1. Go to http://localhost:5000
2. Click **"Citizen Login"** tab
3. Click **"Sign Up"**
4. Fill in:
   - Name: Your Name
   - Email: citizen@test.com
   - Password: test123
   - Village: Downtown
5. Click **"Sign Up"**

You'll be redirected to the Citizen Dashboard!

### Step 2: Report an Issue
1. Click the **"+"** button (floating action button)
2. Fill in the form:
   - Title: Pothole on Main Street
   - Description: Large pothole causing traffic issues
   - Category: Road
   - Village/Area: Downtown
3. Click **"Submit Report"**

### Step 3: Register as Government Official
1. Logout from Citizen Dashboard
2. Click **"Government Login"** tab
3. Click **"Register"**
4. Fill in:
   - Name: Government Official
   - Email: gov@test.com
   - Password: test123
   - Department/Area: Municipal Council
5. Click **"Register"**

You'll be redirected to the Government Dashboard!

### Step 4: View and Manage Issues
1. You should see the **Statistics Dashboard**
2. Click **"All Issues"** in the sidebar
3. You'll see your reported issue with ❤️ 0 Likes
4. Try these actions:
   - Click **"🔄 Refresh"** to reload issues
   - Use **Sort by: Most Liked (Priority)** to see prioritized issues
   - Click **"📝 Update Status"** to change status
   - Click **"👮 Assign Officer"** to assign someone

### Step 5: Test Real-time Notifications
1. Open **two browser windows** side by side:
   - Window 1: Government Dashboard (logged in as gov@test.com)
   - Window 2: Login page
2. In Window 2, login as citizen@test.com
3. Submit a **new issue**
4. Watch Window 1 → You should see a **red notification badge** appear! 🎉

### Step 6: Test Like Feature
1. In Citizen Dashboard, click ❤️ on any issue
2. Go back to Government Dashboard
3. Sort by **"Most Liked (Priority)"**
4. Your liked issue should appear first!

---

## 🎯 Key Features to Test

✅ **Location-based Filtering**
- Switch between "All Locations" and specific villages
- See issues filtered by area

✅ **Status Updates**
- Government can mark issues as: Reported → Under Review → In Progress → Resolved
- See color-coded badges change

✅ **Comments**
- Citizens can add comments to issues
- Click 💬 button to view/add comments

✅ **My Reports**
- Citizens can click "My Reports" to see their submitted issues
- Only shows issues you reported

✅ **Statistics Dashboard**
- Government dashboard shows:
  - Total Issues
  - Reported (new)
  - In Progress
  - Resolved

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
**Solution**: Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### "Port 5000 already in use"
**Solution**: Change the port in `.env` file:
```
PORT=3000
```

### "Socket.IO connection failed"
**Solution**: Make sure you're accessing via `http://localhost:5000` (not `file://`)

### Blank page or 404 errors
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

---

## 📚 Next Steps

- Read the full **README.md** for detailed documentation
- Explore the API endpoints in the backend routes
- Customize the styles in `public/css/` folders
- Add more categories or features as needed

---

**🎉 Congratulations! Your GramaVoice system is now running!**

For questions or issues, check the main README.md file.

