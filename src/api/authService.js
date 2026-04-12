import axiosClient from './axiosClient';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await axiosClient.post('/auth/login', { email, password });

            // Handle nested data property if it exists
            const responseData = response.data.data || response.data;
            const token = responseData.accessToken || responseData.token;

            if (token) {
                localStorage.setItem('accessToken', token);
            }
            return response.data;
        } catch (error) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error(error.message || 'An error occurred during login');
        }
    },

    refresh: async () => {
        try {
            const response = await axiosClient.post('/auth/refresh');
            if (response.data && response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error(error.message || 'An error occurred during token refresh');
        }
    },

    logout: () => {
        localStorage.removeItem('accessToken');
    }
};
