import { useState, useEffect } from 'react';
import { ruleService } from '../services/ruleService';

export function useRules() {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRules = async () => {
        try {
            setLoading(true);
            const data = await ruleService.getRules();
            setRules(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    return { rules, loading, error, refetch: fetchRules };
}
