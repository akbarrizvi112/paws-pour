import axiosClient from './axiosClient';

export const userService = {
    getProfile: async () => {
        const response = await axiosClient.get('/users/profile');
        return response.data;
    },

    getUserById: async (userId) => {
        const response = await axiosClient.get(`/users/${userId}`);
        return response.data;
    },

    updateUserProfile: async (userId, data) => {
        // data should be { name: "string", accountType: "string" }
        const response = await axiosClient.patch(`/users/${userId}`, data);
        return response.data;
    }
};
