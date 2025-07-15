import axios from 'axios';
import { message } from 'antd';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/admin', // Base URL for all admin APIs
});

// Request interceptor to add the auth token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data.message || 'An error occurred';
      message.error(errorMessage);

      if (error.response.status === 401 || error.response.status === 403) {
        // Handle unauthorized or forbidden access, e.g., redirect to login
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // The request was made but no response was received
      message.error('No response from server. Please check your network.');
    } else {
      // Something happened in setting up the request that triggered an Error
      message.error('Error: ' + error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
