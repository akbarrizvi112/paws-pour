import { PageHeader } from '../components/layout/PageHeader';
import { TreatDatabaseTable } from '../components/tables/TreatDatabaseTable';
import { useTreats } from '../hooks/useTreats';
import { Button } from '../components/ui/Button';

export function TreatDatabase() {
    const { treats, loading } = useTreats();

    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title="Treat Database"
                description="Manage and approve treats for the Paws & Pour system."
                action={<Button className="bg-[#6b8c6a] hover:bg-[#5a7659] text-white">Add Treat</Button>}
            />
            {loading ? (
                <div className="h-96 rounded-2xl bg-surface border border-primary-100 animate-pulse"></div>
            ) : (
                <TreatDatabaseTable treats={treats} currentPage={1} totalPages={8} onPageChange={() => { }} />
            )}
        </div>
    );
}
