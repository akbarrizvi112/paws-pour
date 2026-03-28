import { PageHeader } from '../components/layout/PageHeader';
import { SafetyLogsTable } from '../components/tables/SafetyLogsTable';
import { safetyLogsMock } from '../data/rulesMock';
import { Button } from '../components/ui/Button';

export function SafetyLogs() {
    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title="Safety Logs"
                description="Detailed history of safety blocks and system interventions."
                action={<Button variant="outline" className="text-primary-900 border-primary-500">Export Logs</Button>}
            />
            <SafetyLogsTable logs={safetyLogsMock} currentPage={1} totalPages={8} onPageChange={() => { }} />
        </div>
    );
}
