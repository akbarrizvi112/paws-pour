import axiosClient from './axiosClient';

const validateAuth = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = '/login';
        throw new Error('No authentication token found');
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            throw new Error('Authentication token expired');
        }
    } catch (e) {
        // If token is invalid format, redirect anyway if requested
    }
    return token;
};

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
        const response = await axiosClient.patch(`/users/${userId}`, data);
        return response.data;
    },

    deleteUser: async (userId) => {
        const response = await axiosClient.delete(`/users/${userId}`);
        return response.data;
    },

    getAllUsers: async () => {
        const response = await axiosClient.get('/users');
        return response.data;
    },

    getDashboardStats: async () => {
        const token = validateAuth();
        const response = await axiosClient.get('/users/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getRuleEngineActivity: async () => {
        const token = validateAuth();
        const response = await axiosClient.get('/users/dashboard/rule-engine/activity', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getDecisionsToday: async () => {
        const token = validateAuth();
        const response = await axiosClient.get('/users/dashboard/decisions-today', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getSubscriptionChart: async () => {
        const token = validateAuth();
        const response = await axiosClient.get('/users/dashboard/subscription-chart', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};
