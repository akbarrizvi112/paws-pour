import { PageHeader } from '../components/layout/PageHeader';
import { UsersTable } from '../components/tables/UsersTable';
import { Button } from '../components/ui/Button';
import { UserPlus } from 'lucide-react';

export function Users() {
    return (
        <div className="space-y-8 pb-12">
            <PageHeader
                title="User Management"
                action={
                    <Button className="bg-primary hover:bg-primary-600 text-white font-bold flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Add New User
                    </Button>
                }
            />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-primary-900">System Users</h2>
                    <p className="text-sm text-primary-600 font-medium">Manage user permissions and accounts</p>
                </div>
                <UsersTable />
            </div>
        </div>
    );
}
