import { useState, useEffect, useCallback } from 'react';
import { ingredientService } from '../services/ingredientService';

export function useIngredients(initialParams = {}) {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchIngredients = useCallback(async (params = initialParams) => {
        try {
            setLoading(true);
            const data = await ingredientService.getIngredients(params);
            setIngredients(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]);

    return {
        ingredients,
        loading,
        error,
        refetch: fetchIngredients,
        createIngredient: ingredientService.createIngredient,
        updateIngredient: ingredientService.updateIngredient,
        deleteIngredient: ingredientService.deleteIngredient
    };
}
