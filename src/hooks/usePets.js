import { useState, useEffect } from 'react';
import { petService } from '../services/petService';

export function usePets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPets = async () => {
        try {
            setLoading(true);
            const data = await petService.getPets();
            setPets(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    return {
        pets,
        loading,
        error,
        refetch: fetchPets,
        createPet: petService.createPet,
        updatePet: petService.updatePet,
        deletePet: petService.deletePet
    };
}
