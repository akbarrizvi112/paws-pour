import axiosClient from '../api/axiosClient';

export const petService = {
    getPets: async (params = {}) => {
        const response = await axiosClient.get('/pets', { params });
        return response.data;
    },
    getPetById: async (id) => {
        const response = await axiosClient.get(`/pets/${id}`);
        return response.data;
    },
    createPet: async (data) => {
        const response = await axiosClient.post('/pets', data);
        return response.data;
    },
    updatePet: async (id, data) => {
        const response = await axiosClient.patch(`/pets/${id}`, data);
        return response.data;
    },
    deletePet: async (id) => {
        const response = await axiosClient.delete(`/pets/${id}`);
        return response.data;
    }
};
