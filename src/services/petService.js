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
        try {
            console.log("Creating pet with payload:", data);
            const response = await axiosClient.post('/pets', data);
            return response.data;
        } catch (error) {
            console.error("Pet creation API error:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error || JSON.stringify(error.response?.data);
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },
    updatePet: async (idOrObject, data) => {
        // FIX: Prioritize petId as specified by user
        const id = typeof idOrObject === 'object'
            ? idOrObject.petId || idOrObject.petID || idOrObject.id || idOrObject._id
            : idOrObject;

        if (!id) throw new Error("Pet ID is required for update");

        // FIX: Sanitize data - remove ID properties that the server rejects in the body
        const { petId: _p, petID: _P, id: _i, _id: _mi, ...payload } = data;

        try {
            console.log("Updating pet:", id, payload);
            const response = await axiosClient.patch(`/pets/${id}`, payload);
            return response.data;
        } catch (error) {
            console.error("Pet update API error:", error.response?.data || error.message);
            // FIX: Bubble up the specific server message if available
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },
    deletePet: async (idOrObject) => {
        // FIX: Prioritize petId as specified by user
        const id = typeof idOrObject === 'object'
            ? idOrObject.petId || idOrObject.petID || idOrObject.id || idOrObject._id
            : idOrObject;

        if (!id) throw new Error("Pet ID is required for deletion");
        const response = await axiosClient.delete(`/pets/${id}`);
        return response.data;
    },
};
