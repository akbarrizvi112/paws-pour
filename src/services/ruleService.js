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
        // FIX: Unified rules (system rules) usually only allow toggling isActive.
        // The backend explicitly rejects: name, description, category, conditions, actions, updatedAt, createdAt
        const {
            id: _i, ruleId: _ri, rule_id: _rs, source: _s, ruleSource: _rs2,
            name: _n, description: _d, category: _c, conditions: _co, actions: _a,
            updatedAt: _ua, createdAt: _ca, __v: _v,
            ...sanitizedPayload
        } = payload;

        try {
            console.log(`Executing PATCH /rules/unified/${source}/${id}`, sanitizedPayload);
            const response = await axiosClient.patch(`/rules/unified/${source}/${id}`, sanitizedPayload);
            return response.data;
        } catch (error) {
            console.error("Rule patch API error:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
    },

    // ─── Legacy Rules ──────────────────────────────────────────────────────────

    /** GET /rules — get all legacy rules */
    getRules: async () => {
        const response = await axiosClient.get('/rules');
        return response.data;
    },

    /** POST /rules — create a new legacy rule */
    createRule: async (payload) => {
        // FIX: If we are creating a rule, we shouldn't send an ID in the body unless the backend specifically needs it.
        // If this is actually an "update", we might need a different endpoint, but for now we follow the existing pattern with sanitization.
        try {
            console.log("Creating/Updating rule:", payload);
            const response = await axiosClient.post('/rules', payload);
            return response.data;
        } catch (error) {
            console.error("Rule creation API error:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
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
        try {
            console.log(`Creating rule version for /rules/${ruleId}/versions with payload:`, payload);
            const response = await axiosClient.post(`/rules/${ruleId}/versions`, payload);
            return response.data;
        } catch (error) {
            console.error("Rule version creation API error:", error.response?.data || error.message);
            const serverMessage = error.response?.data?.message || error.response?.data?.error || JSON.stringify(error.response?.data);
            if (serverMessage) throw new Error(serverMessage);
            throw error;
        }
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
