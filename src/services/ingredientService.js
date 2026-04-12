import axiosClient from '../api/axiosClient';

export const ingredientService = {
    getIngredients: async (params = {}) => {
        // params can include isToxic, grainStatus, meatSource
        const response = await axiosClient.get('/ingredients', { params });
        return response.data;
    },
    getIngredientById: async (id) => {
        const response = await axiosClient.get(`/ingredients/${id}`);
        return response.data;
    },
    createIngredient: async (data) => {
        const response = await axiosClient.post('/ingredients', data);
        return response.data;
    },
    updateIngredient: async (id, data) => {
        const response = await axiosClient.patch(`/ingredients/${id}`, data);
        return response.data;
    },
    deleteIngredient: async (id) => {
        const response = await axiosClient.delete(`/ingredients/${id}`);
        return response.data;
    }
};
