import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Function to set token in request headers
const setAuthToken = (token : string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Auth Service Functions
export const login = async (username:string, password:string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    const { token } = response.data;
    setAuthToken(token); // Set token in request headers
    return response.data;
  } catch (error : any) {
    throw error.response.data.message;
  }
};

export const signup = async (username:string, password:string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/signup`, { username, password });
    return res
  } catch (error : any) {
    throw error.response.data.message;
  }
};

// File Service Functions
export const uploadFile = async (formData: any) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/file/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log(res)
    return res.data
  } catch (error : any) {
    throw error.response.data.message;
  }
};

export const getFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/file/list`);
    return response.data;
  } catch (error : any) {
    throw error.response.data.message;
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/file/${fileId}`);
  } catch (error : any) {
    throw error.response.data.message;
  }
};

export const downloadFile = async (fileId: string, accessCode: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/file/download/${fileId}`, { accessCode });
    return response.data;
  } catch (error : any) {
    throw error.response.data.message;
  }
};

// Axios interceptor to add token to headers for all requests except login and signup
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token && config.url && !config.url.includes('/auth')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });
  
