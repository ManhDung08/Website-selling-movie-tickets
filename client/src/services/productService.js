import axiosInstance from './axios.config';

export const getProductData = async () => {
  try {
    const response = await axiosInstance.get('/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const getProductDetail = async (id) => {
    try {
      const response = await axiosInstance.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  
