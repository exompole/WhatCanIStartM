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
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/user-login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/api/login', credentials),
  register: (userData) => api.post('/api/register', userData),
  adminLogin: (credentials) => api.post('/api/admin/login', credentials),
  forgotPassword: (email) => api.post('/api/forgot-password', email),
  resetPassword: (token, password) => api.post('/api/reset-password', { token, password }),
};

export const contactAPI = {
  submit: (formData) => api.post('/api/contact', formData),
};

export const geminiAPI = {
  generateIdea: (prompt) => api.post('/api/gemini/generateidea', { prompt }),
};

export const lemonAPI = {
  getAllProducts: () => api.get('/api/lemon-products'),
  getProductById: (id) => api.get(`/api/lemon-products/${id}`),
};

export const adminAPI = {
  getUsers: () => api.get('/api/admin/users'),
  getContacts: () => api.get('/api/admin/contacts'),
};

// Export the base API instance for custom calls
export default api; 