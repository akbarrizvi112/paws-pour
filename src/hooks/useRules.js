import { useState, useEffect, useCallback } from 'react';
import { ruleService } from '../services/ruleService';

export function useRules() {
    const [unifiedRules, setUnifiedRules] = useState([]);
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('unified'); // 'unified' | 'legacy'

    // ─── Fetch ────────────────────────────────────────────────────────────────

    const fetchUnifiedRules = useCallback(async () => {
        try {
            const data = await ruleService.getUnifiedRules();
            setUnifiedRules(Array.isArray(data) ? data : []);
        } catch {
            setUnifiedRules([]);
        }
    }, []);

    const fetchLegacyRules = useCallback(async () => {
        try {
            const data = await ruleService.getRules();
            setRules(Array.isArray(data) ? data : []);
        } catch {
            setRules([]);
        }
    }, []);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await Promise.all([fetchUnifiedRules(), fetchLegacyRules()]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [fetchUnifiedRules, fetchLegacyRules]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    // ─── Legacy CRUD ──────────────────────────────────────────────────────────

    const createRule = useCallback(async (payload) => {
        const created = await ruleService.createRule(payload);
        await fetchLegacyRules();
        return created;
    }, [fetchLegacyRules]);

    const deleteRule = useCallback(async (ruleId) => {
        await ruleService.deleteRule(ruleId);
        setRules(prev => prev.filter(r => (r.id ?? r.ruleId) !== ruleId));
    }, []);

    // ─── Unified patch ────────────────────────────────────────────────────────

    const patchUnifiedRule = useCallback(async (source, id, payload) => {
        const updated = await ruleService.patchUnifiedRule(source, id, payload);
        await fetchUnifiedRules();
        return updated;
    }, [fetchUnifiedRules]);

    // ─── Versions ─────────────────────────────────────────────────────────────

    const getRuleVersions = useCallback((ruleId) => {
        return ruleService.getRuleVersions(ruleId);
    }, []);

    const createRuleVersion = useCallback(async (ruleId, payload) => {
        const ver = await ruleService.createRuleVersion(ruleId, payload);
        return ver;
    }, []);

    return {
        // data
        unifiedRules,
        rules,
        loading,
        error,

        // tab state
        activeTab,
        setActiveTab,

        // actions
        createRule,
        deleteRule,
        patchUnifiedRule,
        getRuleVersions,
        createRuleVersion,

        // manual refetch
        refetch: fetchAll,
    };
}
