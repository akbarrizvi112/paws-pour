import { useState, useEffect, useCallback } from 'react';
import { subscriptionService } from '../services/subscriptionService';

export function useSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [stats, setStats] = useState({});
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Run all three in parallel; each failure is caught individually
            const [statsData, ratesData, subsData] = await Promise.allSettled([
                subscriptionService.getStats(),
                subscriptionService.getRates(),
                subscriptionService.getAllSubscriptions(),
            ]);

            if (statsData.status === 'fulfilled') {
                setStats(statsData.value && typeof statsData.value === 'object' ? statsData.value : {});
            }
            if (ratesData.status === 'fulfilled') {
                setRates(Array.isArray(ratesData.value) ? ratesData.value : []);
            }
            if (subsData.status === 'fulfilled') {
                setSubscriptions(Array.isArray(subsData.value) ? subsData.value : []);
            }
        } catch (err) {
            console.error('Failed to fetch subscriptions:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const createSubscription = useCallback(async (data) => {
        const created = await subscriptionService.createSubscription(data);
        await fetchAll();
        return created;
    }, [fetchAll]);

    const updateSubscription = useCallback(async (id, data) => {
        const updated = await subscriptionService.updateSubscription(id, data);
        await fetchAll();
        return updated;
    }, [fetchAll]);

    const deleteSubscription = useCallback(async (id) => {
        await subscriptionService.deleteSubscription(id);
        await fetchAll();
    }, [fetchAll]);

    return {
        subscriptions,
        stats,
        rates,
        loading,
        error,
        refetch: fetchAll,
        createSubscription,
        updateSubscription,
        deleteSubscription
    };
}
