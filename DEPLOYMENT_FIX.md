# 🚀 Deployment Fix Guide

## Problem: 404 Error on Deployment

Your frontend is trying to connect to `localhost:5000` which doesn't exist on the server.

## 🔧 **Solution Steps**

### 1. **Create Production Environment File**

Create `client/.env.production` with your actual backend URL:

```bash
# Production Environment Variables
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=WhatCanIStart
VITE_APP_VERSION=1.0.0
```

### 2. **Update Vite Configuration**

Update `client/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    'process.env': {}
  }
})
```

### 3. **Update Server Configuration**

Update `server/index.js` to handle CORS properly:

```javascript
// Add CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com', 'https://www.your-frontend-domain.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 4. **Environment Variables Setup**

#### For Frontend (Vercel/Netlify):
```bash
VITE_API_URL=https://your-backend-domain.com/api
```

#### For Backend (Render/Railway):
```bash
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=https://your-frontend-domain.com
```

### 5. **Build and Deploy Commands**

#### Frontend Build:
```bash
cd client
npm run build
```

#### Backend Start:
```bash
cd server
npm start
```

### 6. **Common Deployment Platforms**

#### Vercel (Frontend):
1. Connect your GitHub repo
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`
4. Add environment variables in Vercel dashboard

#### Render (Backend):
1. Connect your GitHub repo
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm start`
4. Add environment variables in Render dashboard

### 7. **Testing Deployment**

#### Check API Health:
```bash
curl https://your-backend-domain.com/api/health
```

#### Check Frontend:
```bash
curl https://your-frontend-domain.com
```

### 8. **Debugging Steps**

1. **Check Network Tab**: Look for failed requests
2. **Check Console**: Look for CORS errors
3. **Check Environment Variables**: Ensure they're set correctly
4. **Check Build Output**: Ensure build completed successfully

### 9. **Common Issues & Solutions**

#### Issue: CORS Error
**Solution**: Update CORS configuration in server

#### Issue: Environment Variables Not Loading
**Solution**: Ensure variables are set in deployment platform

#### Issue: Build Fails
**Solution**: Check for missing dependencies

#### Issue: API Not Found
**Solution**: Verify API URL and server is running

### 10. **Production Checklist**

- [ ] Environment variables set correctly
- [ ] CORS configured for production domains
- [ ] Database connection string updated
- [ ] Build process completed successfully
- [ ] Health check endpoint working
- [ ] Frontend can connect to backend
- [ ] SSL certificates configured
- [ ] Error handling implemented

## 🎯 **Quick Fix for Immediate Deployment**

If you need a quick fix, update your `client/src/utils/env.js`:

```javascript
export const getApiUrl = () => {
  // For production, use relative URL
  if (import.meta.env.PROD) {
    return '/api'; // This will use the same domain as frontend
  }
  
  // For development, use localhost
  return 'http://localhost:5000/api';
};
```

This assumes your frontend and backend are served from the same domain in production.

## 📞 **Need Help?**

If you're still having issues:
1. Check your deployment platform's logs
2. Verify all environment variables are set
3. Test the API endpoint directly
4. Check the network tab in browser dev tools
