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
    updateTreat: async (treatId, data) => {
        // FIX: Prioritize treatId as specified by user
        const id = typeof treatId === 'object'
            ? treatId.treatId || treatId.treatID || treatId.treat_id || treatId.id || treatId._id
            : treatId;

        if (!id) throw new Error("Treat ID is required for update");

        // FIX: Sanitize data - remove ID properties that the server rejects in the body
        const { treatId: _t, treatID: _T, treat_id: _s, id: _i, _id: _mi, ...payload } = data;

        try {
            console.log("Executing PATCH /treats/", id, "with sanitized payload:", payload);
            const response = await axiosClient.patch(`/treats/${id}`, payload);
            return response.data;
        } catch (error) {
            console.error("Treat update API error:", error.response?.data || error.message);
            // FIX: Bubble up the specific server message if available
            const serverMessage = error.response?.data?.message || error.response?.data?.error || error.response?.data?.details;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },
    deleteTreat: async (treatId) => {
        // FIX: Prioritize treatId as specified by user
        const id = typeof treatId === 'object'
            ? treatId.treatId || treatId.treatID || treatId.id || treatId._id
            : treatId;

        if (!id) throw new Error("Treat ID is missing");
        const response = await axiosClient.delete(`/treats/${id}`);
        return response.data;
    }
};
