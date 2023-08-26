import axios from 'axios';
// const API_BASE_URL = 'https://foodorders.azurewebsites.net/api';
const API_BASE_URL = 'https://localhost:7176/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true // Include cookies with every request
});
  

// Use the custom Axios instance to make API requests
export const login = async (email, password) => {
    try {
      const requestBody = {
        email: email,
        password: password
      };
  
      const response =  await apiClient.post('/account/login', requestBody);
      return response.data; // Return the response data (token and expiration)
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
};
  

export const getCustomers = async () => {
try {
    const response = await apiClient.get('/customers');
    return response;
} catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
}

};

// check authentication using the cookie token
export const checkAuth = async () => {
    try {
      const response = await apiClient.get('/account/check-auth');
      return response;
    } catch (error) {
      console.error('Error checking authentication:', error);
      throw error;
    }
};


export const getFoodItems = async () => {
    try {
        const response = await apiClient.get('/foodItems');
        return response;
    } catch (error) {
        console.error('Error fetching foodItems:', error);
        throw error;
    }
}


export const createOrder = async (order) => {
  try {
      const response = await apiClient.post('/order/create-order', order);
      return response;
  } catch (error) {
      console.error('Error fetching foodItems:', error);
      throw error;
  }
}


export const getFullOrders = async () => {
  try {
      const response = await apiClient.get('/order/full-orders');
      return response;
  } catch (error) {
      console.error('Error fetching foodItems:', error);
      throw error;
  }
}


export const register = async (registerData) => {
  try {
    const response =  await apiClient.post('/account/register', registerData);
    return response.data; // Return the response data (token and expiration)
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};



export const updateOrderToCompleted = async (orderId) => {
  try {
    const response =  await apiClient.put('/order/update-order-completed?id=' + orderId);
    return response.data; // Return the response data (token and expiration)
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


export const GetCustomerByUserId = async (userId) => {
  try {
    const response = await apiClient.get('/customers/getByUserId/' + userId);
    return response;
  } catch (error) {
    console.error('Error checking GetCustomerByUserId:', error);
    throw error;
  }
};

export const Logout = async () => {
  try {
    const response = await apiClient.post('/account/logout');
    return response;
  } catch (error) {
    console.error('Error checking :', error);
    throw error;
  }
};