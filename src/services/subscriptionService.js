import axiosClient from '../api/axiosClient';

export const subscriptionService = {
    getStats: async () => {
        try {
            const response = await axiosClient.get('/subscriptions/stats');
            return response.data;
        } catch (error) {
            // FIX: Fallback to safe object on 500 error
            console.error("Subscription stats fetch failed:", error);
            return { total: 0, active: 0, cancelled: 0 };
        }
    },
    getRates: async () => {
        try {
            const response = await axiosClient.get('/subscriptions/rates');
            return response.data;
        } catch (error) {
            // FIX: Fallback to safe array on 500 error
            console.error("Subscription rates fetch failed:", error);
            return [];
        }
    },
    getSubscriptionByPetId: async (petId) => {
        try {
            const response = await axiosClient.get(`/subscriptions/pet/${petId}`);
            return response.data;
        } catch (error) {
            console.error("Fetch subscription by pet failed:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },
    getSubscriptionById: async (id) => {
        try {
            const response = await axiosClient.get(`/subscriptions/${id}`);
            return response.data;
        } catch (error) {
            console.error("Fetch subscription failed:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },
    createSubscription: async (data) => {
        try {
            const response = await axiosClient.post('/subscriptions', data);
            return response.data;
        } catch (error) {
            console.error("Subscription creation failed:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },
    updateSubscription: async (id, data) => {
        try {
            const response = await axiosClient.patch(`/subscriptions/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Subscription update failed:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },
    deleteSubscription: async (id) => {
        try {
            const response = await axiosClient.delete(`/subscriptions/${id}`);
            return response.data;
        } catch (error) {
            console.error("Subscription deletion failed:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },
    getAllSubscriptions: async () => {
        try {
            const response = await axiosClient.get('/subscriptions');
            return response.data;
        } catch (error) {
            console.error("Fetch all subscriptions failed:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    }
};
