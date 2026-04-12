import axiosClient from '../api/axiosClient';

export const nutritionService = {
    getAllNutrition: async () => {
        const response = await axiosClient.get('/nutrition');
        return response.data;
    },
    getNutritionByPetId: async (petId) => {
        const response = await axiosClient.get(`/nutrition/pet/${petId}`);
        return response.data;
    },
    getNutritionById: async (id) => {
        const response = await axiosClient.get(`/nutrition/${id}`);
        return response.data;
    },
    generateNutrition: async (data) => {
        const response = await axiosClient.post('/nutrition/generate', data);
        return response.data;
    },
    createNutrition: async (data) => {
        const response = await axiosClient.post('/nutrition', data);
        return response.data;
    },
    updateNutrition: async (id, data) => {
        const response = await axiosClient.patch(`/nutrition/${id}`, data);
        return response.data;
    },
    deleteNutrition: async (id) => {
        const response = await axiosClient.delete(`/nutrition/${id}`);
        return response.data;
    }
};
