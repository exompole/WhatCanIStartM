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
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debug logging
console.log('🔍 API Service Debug:');
console.log('📡 API_URL:', API_URL);
console.log('🌐 Base URL:', api.defaults.baseURL);

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging for requests
    console.log('🚀 API Request:', {
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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/user-login';
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
  generateIdea: (prompt) => api.post('/gemini/generateidea', { prompt }),
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
};


export default api;
