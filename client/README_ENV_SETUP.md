# 🌐 Environment Variables Setup Guide

## 📁 File Structure
```
client/
├── .env                    # Development environment variables
├── .env.production        # Production environment variables
├── src/
│   ├── services/
│   │   └── api.js        # Centralized API service
│   └── ...
└── README_ENV_SETUP.md   # This guide
```

## 🔧 Step 1: Create Environment Files

### Development (.env)
Create `client/.env` file:
```env
# Backend API URL for development
VITE_API_URL=http://localhost:5000

# Other environment variables
VITE_APP_NAME=WhatCanIStart
VITE_APP_VERSION=1.0.0
```

### Production (.env.production)
Create `client/.env.production` file:
```env
# Backend API URL for production (your Render URL)
VITE_API_URL=https://your-app-name.onrender.com

# Other environment variables
VITE_APP_NAME=WhatCanIStart
VITE_APP_VERSION=1.0.0
```

## 🚀 Step 2: Using Environment Variables in React

### In Components
```javascript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;

console.log('API URL:', apiUrl);
console.log('App Name:', appName);
```

### Using the API Service
```javascript
import { authAPI, contactAPI, geminiAPI } from '../services/api';

// Login
const loginUser = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Contact form
const submitContact = async (formData) => {
  try {
    const response = await contactAPI.submit(formData);
    return response.data;
  } catch (error) {
    console.error('Contact submission failed:', error);
  }
};

// Generate idea
const generateIdea = async (prompt) => {
  try {
    const response = await geminiAPI.generateIdea(prompt);
    return response.data;
  } catch (error) {
    console.error('Idea generation failed:', error);
  }
};
```

## 📦 Step 3: Build and Deploy

### Local Development
```bash
cd client
npm run dev
```

### Production Build
```bash
cd client
npm run build
```

## 🌐 Step 4: Vercel Deployment

### 1. Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Add environment variables setup"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Add Environment Variables in Vercel
1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | `https://your-app-name.onrender.com` | Production |
| `VITE_APP_NAME` | `WhatCanIStart` | Production |
| `VITE_APP_VERSION` | `1.0.0` | Production |

### 4. Deploy
1. Click "Deploy" in Vercel Dashboard
2. Vercel will automatically build and deploy your app
3. Your app will be available at `https://your-app-name.vercel.app`

## 🔍 Step 5: Testing

### Test Environment Variables
```javascript
// Add this to any component to test
console.log('Environment Variables:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('VITE_APP_NAME:', import.meta.env.VITE_APP_NAME);
console.log('Mode:', import.meta.env.MODE);
```

### Test API Calls
```javascript
// Test API connection
import api from '../services/api';

const testConnection = async () => {
  try {
    const response = await api.get('/api/health');
    console.log('API Connection:', response.data);
  } catch (error) {
    console.error('API Connection Failed:', error);
  }
};
```

## 🛠️ Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Make sure variable names start with `VITE_`
   - Restart development server after adding variables

2. **API calls failing in production**
   - Check if `VITE_API_URL` is set correctly in Vercel
   - Verify your Render backend is running
   - Check CORS settings in your backend

3. **Build errors**
   - Make sure all imports are correct
   - Check if all dependencies are installed

### Debug Commands
```bash
# Check environment variables
node -e "console.log(process.env)"

# Check Vite build
npm run build

# Check production build locally
npm run preview
```

## 📋 Checklist

- [ ] Created `.env` file for development
- [ ] Created `.env.production` file for production
- [ ] Updated all API calls to use the service
- [ ] Removed proxy from vite.config.js
- [ ] Pushed code to GitHub
- [ ] Connected repository to Vercel
- [ ] Added environment variables in Vercel
- [ ] Tested deployment
- [ ] Verified API calls work in production

## 🔗 Useful Links

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [React Router Documentation](https://reactrouter.com/docs/en/v6) 