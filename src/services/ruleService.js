import axiosClient from '../api/axiosClient';

export const ruleService = {
    // ─── Unified Rules ─────────────────────────────────────────────────────────

    /** GET /rules/unified — fetch all rules from every source in one list */
    getUnifiedRules: async () => {
        const response = await axiosClient.get('/rules/unified');
        return response.data;
    },

    /**
     * PATCH /rules/unified/{source}/{id}
     * Partially update a unified rule (e.g. enable/disable activity_multiplier).
     * @param {string} source  - e.g. "activity_multiplier"
     * @param {string} id      - UUID of the rule
     * @param {object} payload - fields to patch
     */
    patchUnifiedRule: async (source, id, payload) => {
        const response = await axiosClient.patch(`/rules/unified/${source}/${id}`, payload);
        return response.data;
    },

    // ─── Legacy Rules ──────────────────────────────────────────────────────────

    /** GET /rules — get all legacy rules */
    getRules: async () => {
        const response = await axiosClient.get('/rules');
        return response.data;
    },

    /** POST /rules — create a new legacy rule */
    createRule: async (payload) => {
        const response = await axiosClient.post('/rules', payload);
        return response.data;
    },

    /** GET /rules/{ruleId} — get a single legacy rule by ID */
    getRuleById: async (ruleId) => {
        const response = await axiosClient.get(`/rules/${ruleId}`);
        return response.data;
    },

    /** DELETE /rules/{ruleId} — delete a legacy rule */
    deleteRule: async (ruleId) => {
        const response = await axiosClient.delete(`/rules/${ruleId}`);
        return response.data;
    },

    // ─── Rule Versions ─────────────────────────────────────────────────────────

    /** POST /rules/{ruleId}/versions — create a new version of a rule */
    createRuleVersion: async (ruleId, payload) => {
        const response = await axiosClient.post(`/rules/${ruleId}/versions`, payload);
        return response.data;
    },

    /** GET /rules/{ruleId}/versions — list all versions for a rule */
    getRuleVersions: async (ruleId) => {
        const response = await axiosClient.get(`/rules/${ruleId}/versions`);
        return response.data;
    },

    /** GET /rules/versions/{ruleVerId} — get a specific rule version by its own ID */
    getRuleVersionById: async (ruleVerId) => {
        const response = await axiosClient.get(`/rules/versions/${ruleVerId}`);
        return response.data;
    },
};
