import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { TreatDatabaseTable } from '../components/tables/TreatDatabaseTable';
import { TreatModal } from '../components/modals/TreatModal';
import { useTreats } from '../hooks/useTreats';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { Loader } from '../components/ui/Loader';

export function TreatDatabase() {
    const { treats, loading, refetch, createTreat, updateTreat, deleteTreat } = useTreats();
    const { showToast } = useToast();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTreat, setEditingTreat] = useState(null);

    const handleOpenAdd = () => {
        setEditingTreat(null);
        setModalOpen(true);
    };

    const handleEdit = (treat) => {
        setEditingTreat(treat);
        setModalOpen(true);
    };

    const handleDelete = async (treat) => {
        if (!window.confirm(`Delete treat "${treat.name}"?`)) return;
        try {
            const idToDelete = treat.treatId || treat.treatID || treat.treat_id || treat.id || treat._id;
            await deleteTreat(idToDelete);
            refetch();
            showToast('Treat deleted successfully');
        } catch (err) {
            alert('Failed to delete treat: ' + err.message);
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (editingTreat) {
                const idToUpdate = data.treatId || data.treatID || data.treat_id || data.id || data._id ||
                    editingTreat.treatId || editingTreat.treatID || editingTreat.treat_id || editingTreat.id || editingTreat._id;

                if (!idToUpdate) throw new Error("Treat ID is required for update.");

                await updateTreat(idToUpdate, data);
            } else {
                await createTreat(data);
            }
            refetch();
            showToast(editingTreat ? 'Treat updated successfully' : 'Treat created successfully');
        } catch (err) {
            alert('Failed to save treat: ' + err.message);
        }
    };

    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title="Treat Database"
                description="Manage and approve treats for the Paws & Pour system."
                action={
                    <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary-600 text-white font-bold flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Add New Treat
                    </Button>
                }
            />
            {loading ? (
                <Loader />
            ) : (
                <TreatDatabaseTable
                    treats={(Array.isArray(treats) ? treats : [])}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    currentPage={1}
                    totalPages={1}
                    onPageChange={() => { }}
                />
            )}

            <TreatModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                treat={editingTreat}
            />
        </div>
    );
}
