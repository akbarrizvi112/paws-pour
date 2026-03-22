import { PageHeader } from '../components/layout/PageHeader';
import { SubscriptionChart } from '../components/dashboard/SubscriptionChart';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';

export function Subscriptions() {
    const { stats, rates, loading } = useSubscriptions();

    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title="Subscriptions"
                description="Monitor trial to paid conversions and active subscribers."
            />

            {loading ? (
                <div className="h-96 rounded-2xl bg-surface border border-primary-100 animate-pulse"></div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-[400px]">
                        <SubscriptionChart data={stats} />
                    </div>

                    <div className="rounded-2xl border border-primary-100 bg-surface shadow-sm overflow-hidden h-fit">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Metric</TableHead>
                                    <TableHead>April</TableHead>
                                    <TableHead>May</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rates.map(rate => (
                                    <TableRow key={rate.id}>
                                        <TableCell className="font-medium text-primary-900">{rate.label}</TableCell>
                                        <TableCell className="text-primary-600">{rate.apr}</TableCell>
                                        <TableCell className="text-primary-600">{rate.may}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}
