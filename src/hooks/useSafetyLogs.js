import { useState, useEffect, useCallback } from 'react';
import { safetyService } from '../services/safetyService';

export function useSafetyLogs(petFilter = null) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLogs = useCallback(async (petId = null) => {
        setLoading(true);
        setError(null);
        try {
            const data = petId
                ? await safetyService.getLogsByPetId(petId)
                : await safetyService.getLogs();

            setLogs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch safety logs:', err);
            setError('Failed to load safety logs. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLogs(petFilter);
    }, [fetchLogs, petFilter]);

    return {
        logs,
        loading,
        error,
        refetch: () => fetchLogs(petFilter)
    };
}
