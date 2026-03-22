// eslint-disable-next-line no-unused-vars
import axiosClient from '../api/axiosClient';
import { petsMock } from '../data/petsMock';

export const petService = {
    getPets: async () => {
        // return axiosClient.get('/pets');
        return new Promise((resolve) => setTimeout(() => resolve(petsMock), 400));
    },
    getPetById: async (id) => {
        // return axiosClient.get(`/pets/${id}`);
        return new Promise((resolve) => setTimeout(() => resolve(petsMock.find(p => p.id === id)), 400));
    },
    createPet: async (data) => {
        // return axiosClient.post('/pets', data);
        return new Promise((resolve) => setTimeout(() => resolve({ id: Date.now(), ...data }), 400));
    },
    updatePet: async (id, data) => {
        // return axiosClient.put(`/pets/${id}`, data);
        return new Promise((resolve) => setTimeout(() => resolve({ id, ...data }), 400));
    },
    deletePet: async (id) => {
        // return axiosClient.delete(`/pets/${id}`);
        return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 400));
    }
};
