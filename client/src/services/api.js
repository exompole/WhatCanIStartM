import axios from 'axios';
import { getApiUrl, logEnvInfo } from '../utils/env';

// Get the API URL from environment variables
const API_URL = getApiUrl();

// Log environment info in development
if (import.meta.env.DEV) {
  logEnvInfo();
}

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL, // Should end with /api in .env file
  timeout: 30000, // Increased from 10000 to 30000 (30 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debug logging
console.log('API Service Debug:');
console.log('API_URL:', API_URL);
console.log('Base URL:', api.defaults.baseURL);

// Test URL construction
const testUrl = api.defaults.baseURL + '/register';
console.log('Test URL construction:', testUrl);
console.log('Expected server path: /api/register');

// Additional debugging for all API calls
console.log('Available API endpoints:');
console.log('- POST /api/login');
console.log('- POST /api/register');
console.log('- POST /api/gemini/generateidea');
console.log('- GET /api/lemon-products');
console.log('- POST /api/contact');
console.log('- GET /api/health');

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging for requests
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullUrl: config.baseURL + config.url,
      data: config.data
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.log('API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      response: error.response?.data,
      code: error.code
    });
    
    // Handle specific error types
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('Request timeout - the server took too long to respond');
      error.message = 'Request timed out. Please try again or check your internet connection.';
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpire');
      window.location.href = '/LoginRegistration';
    }
    return Promise.reject(error);
  }
);

// AUTH APIs
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
  forgotPassword: (email) => api.post('/forgot-password', email),
  resetPassword: (token, password) => api.post(`/reset-password/${token}`, { password }),
  adminLogin: (credentials) => api.post('/admin-login', credentials),
};

// CONTACT API
export const contactAPI = {
  submit: (formData) => api.post('/contact', formData),
};

// GEMINI API
export const geminiAPI = {
  generateIdea: async (prompt, retries = 2) => {
    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        const response = await api.post('/gemini/generateidea', { prompt });
        return response;
      } catch (error) {
        console.log(`Attempt ${attempt} failed:`, error.message);
        
        // If it's the last attempt or not a timeout error, throw the error
        if (attempt === retries + 1 || 
            (error.code !== 'ECONNABORTED' && !error.message.includes('timeout'))) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  },
};

// LEMON PRODUCTS API
export const lemonAPI = {
  getAllProducts: () => api.get('/lemon-products'),
  getProductById: (id) => api.get(`/lemon-products/${id}`),
};

// ADMIN APIs
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  getContacts: () => api.get('/admin/contacts'),
  approvePayment: (userId) => api.post(`/admin/users/${userId}/approve-payment`),
  setSubscription: (userId, plan) => api.post(`/admin/users/${userId}/set-subscription`, { plan }),
  setAdmin: (userId, isAdmin) => api.post(`/admin/users/${userId}/set-admin`, { isAdmin }),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  // New role-based admin APIs
  getSubAdmins: () => api.get('/admin/sub-admins'),
  createSubAdmin: (creatorId, userData) => api.post(`/admin/users/${creatorId}/create-sub-admin`, userData),
  approveSubAdmin: (userId, approvedBy) => api.post(`/admin/users/${userId}/approve-sub-admin`, { approvedBy }),
  updateUserRole: (userId, role, updatedBy) => api.post(`/admin/users/${userId}/update-role`, { role, updatedBy }),
};

// Test function for debugging
export const testAPI = {
  health: () => api.get('/health'),
  test: () => api.get('/test'),
};

export default api;
