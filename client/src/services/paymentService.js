import axiosInstance from './axios.config';

export const createPayment = async (data) => {
    console.log('data', data)
  try {
    const response = await axiosInstance.post('/payment/create-payment',data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
  