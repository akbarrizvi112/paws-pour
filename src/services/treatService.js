import axiosClient from '../api/axiosClient';

export const treatService = {
    getTreats: async (params = {}) => {
        const response = await axiosClient.get('/treats', { params });
        return response.data;
    },
    getTreatById: async (id) => {
        const response = await axiosClient.get(`/treats/${id}`);
        return response.data;
    },
    createTreat: async (data) => {
        const response = await axiosClient.post('/treats', data);
        return response.data;
    },
    updateTreat: async (id, data) => {
        const response = await axiosClient.patch(`/treats/${id}`, data);
        return response.data;
    },
    deleteTreat: async (id) => {
        const response = await axiosClient.delete(`/treats/${id}`);
        return response.data;
    }
};
