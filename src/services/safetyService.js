import axiosClient from '../api/axiosClient';

export const safetyService = {
    /** GET /audit — fetch all audit/safety logs */
    getLogs: async () => {
        const response = await axiosClient.get('/audit');
        return response.data;
    },

    /** GET /audit/pet/{petId} — fetch audit logs for a specific pet */
    getLogsByPetId: async (petId) => {
        const response = await axiosClient.get(`/audit/pet/${petId}`);
        return response.data;
    },

    /** GET /audit/{logId} — fetch a specific audit log entry */
    getLogById: async (logId) => {
        const response = await axiosClient.get(`/audit/${logId}`);
        return response.data;
    },
};
