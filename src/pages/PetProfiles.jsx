import { PageHeader } from '../components/layout/PageHeader';
import { PetProfilesTable } from '../components/tables/PetProfilesTable';
import { usePets } from '../hooks/usePets';
import { Button } from '../components/ui/Button';

export function PetProfiles() {
    const { pets, loading } = usePets();

    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title="Pet Profiles"
                description="Manage all user pets and activity statuses."
                action={<Button>Add Pet Profile</Button>}
            />
            {loading ? (
                <div className="h-96 rounded-2xl bg-surface border border-primary-100 animate-pulse"></div>
            ) : (
                <PetProfilesTable pets={pets} currentPage={1} totalPages={5} onPageChange={() => { }} />
            )}
        </div>
    );
}
