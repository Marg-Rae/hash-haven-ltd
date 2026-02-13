# Deployment Guide for HashHaven Ltd

## 🚀 Quick Start Commands

### Backend Installation
```bash
cd backend
npm install
npm run dev
```

### Frontend Installation
```bash
cd frontend
npm install
npm run dev
```

---

## 📤 Pushing to GitHub

Your Git repository has been initialized and all files have been committed. Now you need to push to GitHub:

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `hash-haven-ltd`
3. **Do NOT** initialize with README (we already have one)
4. Click "Create repository"

### Step 2: Push to GitHub
Run these commands in your terminal:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/hash-haven-ltd.git

# Push to GitHub
git push -u origin main
```

---

## 🌐 Backend Deployment (Render)

### Step 1: Prepare MongoDB
1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier available)
2. Create a new cluster
3. Set up database access (create user with password)
4. Get your connection string (replace <password> with actual password)

### Step 2: Deploy to Render
1. Go to [Render](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `hashhaven-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://hashhaven-backend.onrender.com`)

---

## 🎨 Frontend Deployment (Netlify)

### Step 1: Deploy to Netlify
1. Go to [Netlify](https://www.netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `hash-haven-ltd` repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

5. Add Environment Variables:
   - Click "Site settings" → "Environment variables"
   - Add: `VITE_API_URL` = `https://your-render-backend-url.onrender.com/api`

6. Click "Deploy site"
7. Wait for deployment (2-5 minutes)

### Step 2: Custom Domain (Optional)
1. In Netlify, go to "Domain settings"
2. Add custom domain or use the provided `.netlify.app` domain

---

## 🗄️ Database Setup

### Seed Data (Optional)

After your backend is deployed, you can add sample data using API calls:

#### Create a Sample Post
```bash
curl -X POST https://your-backend-url.onrender.com/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome to HashHaven Ltd",
    "excerpt": "Beginning our journey in regenerative systems and digital innovation.",
    "content": "This is our first post documenting the launch of HashHaven Ltd...",
    "category": "Journey",
    "tags": ["launch", "welcome"],
    "featured": true
  }'
```

#### Create a Sample Project
```bash
curl -X POST https://your-backend-url.onrender.com/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "GIS Land Mapping System",
    "description": "Interactive mapping tool for land analysis",
    "category": "Land Lab",
    "technologies": ["React", "Leaflet", "MongoDB"],
    "status": "In Progress",
    "featured": true
  }'
```

---

## 🔧 Post-Deployment Configuration

### Update Frontend Environment
After backend deployment, update your frontend environment:

1. In Netlify → Site settings → Environment variables
2. Update `VITE_API_URL` with your actual backend URL
3. Trigger a new deployment

### Test Your Application
1. Visit your Netlify URL
2. Test all pages:
   - Home page
   - Land Lab
   - Digital Forge
   - Field Notes
   - About
   - Contact form
3. Submit a test contact form
4. Verify backend API is responding

---

## 📊 Monitoring

### Render Dashboard
- Check logs for backend errors
- Monitor response times
- View deployment history

### Netlify Dashboard
- Check build logs
- Monitor site analytics
- View form submissions (if Netlify Forms enabled)

---

## 🐛 Troubleshooting

### Backend Issues
- **Cannot connect to MongoDB**: Check connection string and whitelist IPs
- **API not responding**: Check Render logs for errors
- **CORS errors**: Verify FRONTEND_URL environment variable

### Frontend Issues
- **Build fails**: Check Node.js version (should be 18+)
- **API calls fail**: Verify VITE_API_URL is correct
- **Blank page**: Check browser console for errors

### Common Fixes
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check environment variables
# Make sure all required vars are set in deployment platforms
```

---

## 🔐 Security Checklist

- ✅ MongoDB connection string is secure and not exposed
- ✅ Environment variables are set on deployment platforms (not in code)
- ✅ CORS is configured correctly
- ✅ .env files are in .gitignore
- ✅ API endpoints validate inputs
- ✅ No sensitive data in git history

---

## 📈 Next Steps

1. **Add Authentication**: Implement JWT for admin routes
2. **Image Upload**: Add Cloudinary or AWS S3 for images
3. **Email Service**: Integrate SendGrid or Mailgun for contact forms
4. **Analytics**: Add Google Analytics or Plausible
5. **SEO**: Add sitemap and optimize meta tags
6. **Performance**: Implement caching and CDN
7. **Testing**: Add unit and integration tests

---

## 🎉 You're Live!

Your application is now deployed and accessible worldwide!

- **Frontend**: https://your-site.netlify.app
- **Backend**: https://your-backend.onrender.com
- **MongoDB**: Managed by Atlas

Share your site, gather feedback, and iterate!

---

## 💡 Tips

- Monitor your application regularly
- Keep dependencies updated
- Backup your MongoDB database
- Use Git branches for new features
- Test thoroughly before deploying to production
- Document any custom configurations

Happy building! 🚀
