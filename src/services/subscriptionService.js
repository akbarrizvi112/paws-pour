// eslint-disable-next-line no-unused-vars
import axiosClient from '../api/axiosClient';
import { subscriptionStatsMock, subscriptionRatesMock } from '../data/subscriptionMock';

export const subscriptionService = {
    getStats: async () => {
        // return axiosClient.get('/subscriptions/stats');
        return new Promise((resolve) => setTimeout(() => resolve(subscriptionStatsMock), 400));
    },
    getRates: async () => {
        // return axiosClient.get('/subscriptions/rates');
        return new Promise((resolve) => setTimeout(() => resolve(subscriptionRatesMock), 400));
    }
};
