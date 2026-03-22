import { useState, useEffect } from 'react';
import { subscriptionService } from '../services/subscriptionService';

export function useSubscriptions() {
    const [stats, setStats] = useState([]);
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const [statsData, ratesData] = await Promise.all([
                subscriptionService.getStats(),
                subscriptionService.getRates()
            ]);
            setStats(statsData);
            setRates(ratesData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    return { stats, rates, loading, error, refetch: fetchSubscriptions };
}
