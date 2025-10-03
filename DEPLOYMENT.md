# 🚀 BarBook Order Management - Railway Deployment Guide

This guide provides step-by-step instructions for deploying your BarBook Order Management application to Railway.

## 📋 Prerequisites

- Node.js 20+ installed
- Yarn package manager
- Git repository (GitHub recommended)
- Railway account (free)

## 🎯 Railway Deployment (Recommended) ⭐

Railway is the perfect choice for your BarBook app - it's free forever, handles both frontend and backend, and requires zero configuration.

### Why Railway?
- ✅ **Free forever** - No time limits or usage caps
- ✅ **Zero configuration** - Just connect GitHub and deploy
- ✅ **No sleep** - Always responsive
- ✅ **Custom domain** - Get your own URL
- ✅ **Automatic HTTPS** - Secure by default
- ✅ **Built-in monitoring** - Health checks and logs
- ✅ **Database support** - Can add PostgreSQL later if needed

### Quick Deploy (2 Minutes)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to Railway"
   git push origin main
   ```

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repository
   - Railway will automatically detect your Dockerfile and deploy!

3. **Your app is live!** 🎉
   - URL: `https://your-app-name.railway.app`
   - Health check: `https://your-app-name.railway.app/api/health`

---

## 🔧 Pre-Deployment Checklist

### 1. Test Production Build Locally
```bash
# Build the frontend
yarn client:build

# Test production server
NODE_ENV=production yarn server:start

# Test at http://localhost:3001
```

### 2. Environment Variables
Railway will automatically set these:
- `NODE_ENV=production`
- `PORT=3001` (Railway sets this automatically)
- `DB_PATH=./data.db`

### 3. Security Features
- ✅ CORS is configured
- ✅ Input validation is in place
- ✅ Error handling is implemented
- ✅ No sensitive data in logs

### 4. Performance Optimizations
- ✅ Frontend is built and minified
- ✅ Static files are served efficiently
- ✅ Database queries are optimized
- ✅ Health check endpoint exists

---

## 📊 Monitoring & Maintenance

### Health Checks
Your app includes a health check endpoint: `/api/health`

### Railway Dashboard
- **Logs:** Built-in logging in Railway dashboard
- **Metrics:** CPU, memory, and network usage
- **Deployments:** Automatic deployments from GitHub

### Database
- **SQLite:** File-based database (included in deployment)
- **Upgrade:** Can add Railway PostgreSQL addon later if needed

---

## 🆘 Troubleshooting

### Common Issues:

1. **Build fails:**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules client/node_modules
   yarn install
   cd client && yarn install && cd ..
   ```

2. **Database not found:**
   ```bash
   # Seed the database locally first
   yarn seed
   ```

3. **CORS errors:**
   - Check CORS configuration in server
   - Verify API URL in frontend

4. **Port issues:**
   - Railway sets PORT automatically
   - Your code uses `process.env.PORT || 3001`

---

## 🎉 Success!

Once deployed to Railway, your BarBook Order Management app will be live and accessible to users worldwide!

**Next Steps:**
- Set up custom domain (optional)
- Monitor usage in Railway dashboard
- Add PostgreSQL addon if you need more database features

---

**Need help?** Check Railway's documentation or create an issue in your repository.
