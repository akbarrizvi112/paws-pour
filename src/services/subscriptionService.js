import axiosClient from '../api/axiosClient';

export const subscriptionService = {
    getStats: async () => {
        const response = await axiosClient.get('/subscriptions/stats');
        return response.data;
    },
    getRates: async () => {
        const response = await axiosClient.get('/subscriptions/rates');
        return response.data;
    },
    getSubscriptionByPetId: async (petId) => {
        const response = await axiosClient.get(`/subscriptions/pet/${petId}`);
        return response.data;
    },
    getSubscriptionById: async (id) => {
        const response = await axiosClient.get(`/subscriptions/${id}`);
        return response.data;
    },
    createSubscription: async (data) => {
        const response = await axiosClient.post('/subscriptions', data);
        return response.data;
    },
    updateSubscription: async (id, data) => {
        const response = await axiosClient.patch(`/subscriptions/${id}`, data);
        return response.data;
    },
    deleteSubscription: async (id) => {
        const response = await axiosClient.delete(`/subscriptions/${id}`);
        return response.data;
    },
    getAllSubscriptions: async () => {
        const response = await axiosClient.get('/subscriptions');
        return response.data;
    }
};
