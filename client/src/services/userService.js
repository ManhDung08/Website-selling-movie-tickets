import axiosInstance from '../axiosConfig';

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('users/register',userData);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const login = async (loginData) => {
    try {
      const response = await axiosInstance.post('users/login',loginData);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  export const userDetail = async (id) => {
    try {
      const response = await axiosInstance.get(`users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };