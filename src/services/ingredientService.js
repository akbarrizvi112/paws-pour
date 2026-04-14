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
    updateIngredient: async (idOrObject, data) => {
        // FIX: Prioritize ingId as specified by user
        const id = typeof idOrObject === 'object'
            ? idOrObject.ingId || idOrObject.id || idOrObject._id
            : idOrObject;

        if (!id) throw new Error("Ingredient ID is required for update");

        // FIX: Sanitize data
        const { ingId: _ig, id: _i, _id: _mi, ...payload } = data;

        const response = await axiosClient.patch(`/ingredients/${id}`, payload);
        return response.data;
    },
    deleteIngredient: async (idOrObject) => {
        // FIX: Prioritize ingId as specified by user
        const id = typeof idOrObject === 'object'
            ? idOrObject.ingId || idOrObject.id || idOrObject._id
            : idOrObject;

        if (!id) throw new Error("Ingredient ID is required for deletion");
        const response = await axiosClient.delete(`/ingredients/${id}`);
        return response.data;
    }
};
