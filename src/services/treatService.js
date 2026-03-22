// eslint-disable-next-line no-unused-vars
import axiosClient from '../api/axiosClient';
import { treatsMock } from '../data/treatsMock';

export const treatService = {
    getTreats: async () => {
        // return axiosClient.get('/treats');
        return new Promise((resolve) => setTimeout(() => resolve(treatsMock), 400));
    },
    getTreatById: async (id) => {
        // return axiosClient.get(`/treats/${id}`);
        return new Promise((resolve) => setTimeout(() => resolve(treatsMock.find(t => t.id === id)), 400));
    },
    createTreat: async (data) => {
        // return axiosClient.post('/treats', data);
        return new Promise((resolve) => setTimeout(() => resolve({ id: Date.now(), ...data }), 400));
    },
    updateTreat: async (id, data) => {
        // return axiosClient.put(`/treats/${id}`, data);
        return new Promise((resolve) => setTimeout(() => resolve({ id, ...data }), 400));
    },
    deleteTreat: async (id) => {
        // return axiosClient.delete(`/treats/${id}`);
        return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 400));
    }
};
