import { useState, useEffect } from 'react';
import { treatService } from '../services/treatService';

export function useTreats() {
    const [treats, setTreats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTreats = async () => {
        try {
            setLoading(true);
            const data = await treatService.getTreats();
            setTreats(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTreats();
    }, []);

    return {
        treats,
        loading,
        error,
        refetch: fetchTreats,
        createTreat: treatService.createTreat,
        updateTreat: treatService.updateTreat,
        deleteTreat: treatService.deleteTreat
    };
}
