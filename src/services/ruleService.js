// eslint-disable-next-line no-unused-vars
import axiosClient from '../api/axiosClient';
import { rulesMock } from '../data/rulesMock';

export const ruleService = {
    getRules: async () => {
        // return axiosClient.get('/rules');
        return new Promise((resolve) => setTimeout(() => resolve(rulesMock), 400));
    },
    updateRuleStatus: async (id, status) => {
        // return axiosClient.patch(`/rules/${id}/status`, { status });
        return new Promise((resolve) => setTimeout(() => resolve({ id, status }), 400));
    }
};
