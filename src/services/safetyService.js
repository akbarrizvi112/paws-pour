// eslint-disable-next-line no-unused-vars
import axiosClient from '../api/axiosClient';
import { safetyLogsMock } from '../data/rulesMock'; // Stored together in rulesMock for simplicity

export const safetyService = {
    getLogs: async () => {
        // return axiosClient.get('/safety/logs');
        return new Promise((resolve) => setTimeout(() => resolve(safetyLogsMock), 400));
    }
};
