import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { PetProfilesTable } from '../components/tables/PetProfilesTable';
import { PetModal } from '../components/modals/PetModal';
import { PetNutritionModal } from '../components/modals/PetNutritionModal';
import { usePets } from '../hooks/usePets';
import { petService } from '../services/petService';
import { Button } from '../components/ui/Button';
import { PawPrint, Search } from 'lucide-react';

export function PetProfiles() {
    const { pets, loading, refetch } = usePets();
    const [modalOpen, setModalOpen] = useState(false);
    const [nutritionModalOpen, setNutritionModalOpen] = useState(false);
    const [editingPet, setEditingPet] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddPet = async (data) => {
        await petService.createPet(data);
        refetch();
    };

    const handleUpdatePet = async (data) => {
        await petService.updatePet(editingPet.id || editingPet._id, data);
        refetch();
    };

    const handleDeletePet = async (pet) => {
        if (!window.confirm(`Are you sure you want to delete "${pet.name}"?`)) return;
        try {
            await petService.deletePet(pet.id || pet._id);
            refetch();
        } catch (err) {
            alert('Failed to delete pet: ' + (err.message || 'Unknown error'));
        }
    };

    const handleEdit = (pet) => {
        setEditingPet(pet);
        setModalOpen(true);
    };

    const handleNutrition = (pet) => {
        setSelectedPet(pet);
        setNutritionModalOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingPet(null);
        setModalOpen(true);
    };

    const filteredPets = (Array.isArray(pets) ? pets : []).filter(pet =>
        pet.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.species?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pet.breedCategory || pet.breed)?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title="Pet Profiles"
                description="Manage all registered pet profiles."
                action={
                    <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary-600 text-white font-bold flex items-center gap-2">
                        <PawPrint className="w-5 h-5" />
                        Add Pet Profile
                    </Button>
                }
            />

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                <input
                    type="text"
                    placeholder="Search by name, species, or breed..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary-100 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                />
            </div>

            {loading ? (
                <div className="h-96 rounded-2xl bg-surface border border-primary-100 animate-pulse"></div>
            ) : (
                <PetProfilesTable
                    pets={filteredPets}
                    onEdit={handleEdit}
                    onDelete={handleDeletePet}
                    onNutrition={handleNutrition}
                />
            )}

            <PetModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditingPet(null); }}
                onSubmit={editingPet ? handleUpdatePet : handleAddPet}
                pet={editingPet}
            />

            <PetNutritionModal
                isOpen={nutritionModalOpen}
                onClose={() => { setNutritionModalOpen(false); setSelectedPet(null); }}
                pet={selectedPet}
            />
        </div>
    );
}
