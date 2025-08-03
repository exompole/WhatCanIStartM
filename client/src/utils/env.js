// Environment variable validation and fallbacks
export const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'WhatCanIStart',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
};

// Validate required environment variables
export const validateEnv = () => {
  const required = ['VITE_API_URL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing);
    console.warn('Please check your .env file');
  }
  
  return missing.length === 0;
};

// Get API URL with validation
export const getApiUrl = () => {
  const apiUrl = ENV.API_URL;
  
  if (!apiUrl) {
    console.error('❌ VITE_API_URL is not set');
    return 'http://localhost:5000';
  }
  
  return apiUrl;
};

// Log environment info (for debugging)
export const logEnvInfo = () => {
  console.log('🌍 Environment Info:');
  console.log('  API URL:', ENV.API_URL);
  console.log('  App Name:', ENV.APP_NAME);
  console.log('  App Version:', ENV.APP_VERSION);
  console.log('  Mode:', ENV.MODE);
  console.log('  Development:', ENV.IS_DEVELOPMENT);
  console.log('  Production:', ENV.IS_PRODUCTION);
};

// Export default environment object
export default ENV; 