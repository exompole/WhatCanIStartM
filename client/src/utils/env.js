// Central environment config
export const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL?.trim() || 'http://localhost:5000/api',

  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME?.trim() || 'WhatCanIStart',
  APP_VERSION: import.meta.env.VITE_APP_VERSION?.trim() || '1.0.0',

  // Environment Mode
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
};

// Validate required env variables
export const validateEnv = () => {
  const required = ['VITE_API_URL'];
  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing.join(', '));
    console.warn('🛠️ Please check your .env file');
  }

  return missing.length === 0;
};

// Get API URL with fallback
export const getApiUrl = () => {
  if (!ENV.API_URL) {
    console.error('❌ VITE_API_URL is not set. Defaulting to localhost.');
    return 'http://localhost:5000/api';
  }
  return ENV.API_URL;
};

// Log detailed environment info (for dev only)
export const logEnvInfo = () => {
  console.log('🧪 Environment Info:');
  console.log('📡 API URL:', ENV.API_URL);
  console.log('📦 App Name:', ENV.APP_NAME);
  console.log('🧮 App Version:', ENV.APP_VERSION);
  console.log('🌐 Mode:', ENV.MODE);
  console.log('🛠️ Development:', ENV.IS_DEVELOPMENT);
  console.log('🚀 Production:', ENV.IS_PRODUCTION);
};

// Optional: Immediately validate when imported (dev only)
if (import.meta.env.DEV) {
  validateEnv();
}

export default ENV;
