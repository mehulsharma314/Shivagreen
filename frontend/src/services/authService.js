import api from './Api.js';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/login', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);  
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await api.get('/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
