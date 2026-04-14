import { PageHeader } from '../components/layout/PageHeader';
import { SubscriptionChart } from '../components/dashboard/SubscriptionChart';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { SubscriptionModal } from '../components/modals/SubscriptionModal';
import { useState } from 'react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

function statusVariant(status) {
    const s = (status ?? '').toUpperCase();
    if (s === 'ACTIVE') return 'success';
    if (s === 'EXPIRED' || s === 'CANCELLED') return 'danger';
    if (s === 'TRIAL') return 'default';
    return 'default';
}

function shortId(id) {
    if (!id) return '—';
    return id.slice(0, 8) + '…';
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Subscriptions() {
    const {
        subscriptions,
        stats,
        rates,
        loading,
        error,
        refetch,
        deleteSubscription
    } = useSubscriptions();

    const [selectedSub, setSelectedSub] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (sub) => {
        setSelectedSub(sub);
        setIsModalOpen(true);
    };

    const handleDelete = async (id, petId) => {
        if (!id) {
            alert('Cannot delete: Subscription ID is missing.');
            return;
        }
        if (!window.confirm(`Are you sure you want to delete the subscription for Pet ID: ${petId}?`)) return;
        try {
            await deleteSubscription(id);
        } catch (err) {
            alert('Failed to delete subscription: ' + (err.message || 'Unknown error'));
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <PageHeader
                title="Subscriptions"
                description="Monitor trial to paid conversions and active subscribers."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Chart */}
                <div className="lg:col-span-2 h-[400px]">
                    <SubscriptionChart data={stats} />
                </div>

                {/* Rates / Summary Table */}
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
                            {rates && rates.length > 0 ? rates.map((rate, i) => (
                                <TableRow key={rate.id ?? i}>
                                    <TableCell className="font-medium text-primary-900">{rate.label}</TableCell>
                                    <TableCell className="text-primary-600">{rate.apr}</TableCell>
                                    <TableCell className="text-primary-600">{rate.may}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center text-primary-400">
                                        No metrics available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Subscription list */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-primary-900">Pet Subscriptions</h2>
                    <Button variant="ghost" className="text-primary-600" onClick={refetch}>↻ Refresh List</Button>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                        Error loading subscriptions. Please check your connection.
                    </div>
                )}

                {loading ? (
                    <div className="h-64 rounded-2xl bg-surface border border-primary-100 animate-pulse" />
                ) : (
                    <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pet ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Trial Period</TableHead>
                                    <TableHead>Est. Price</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subscriptions.map((sub, i) => {
                                    // FIX: Robust ID resolution for subscriptions. Try all common variations.
                                    const id = sub.subscriptionId || sub.subscriptionID || sub.subId || sub.subID || sub.id || sub._id || sub.petId;
                                    const displayId = id || `sub-${i}`;
                                    return (
                                        <TableRow key={displayId}>
                                            <TableCell>
                                                <code className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                                                    {shortId(sub.petId)}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={statusVariant(sub.status)}>
                                                    {sub.status || 'UNKNOWN'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-primary-600">
                                                {formatDate(sub.trialStart)} → {formatDate(sub.trialEnd)}
                                            </TableCell>
                                            <TableCell className="font-medium text-primary-900">
                                                ${sub.estPrice != null ? Number(sub.estPrice).toFixed(2) : '0.00'}
                                            </TableCell>
                                            <TableCell>
                                                {sub.isTrial && <Badge variant="default" className="bg-warning-soft text-warning border-none">Trial</Badge>}
                                                {sub.isPaid && <Badge variant="success" className="ml-1">Paid</Badge>}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-primary-600"
                                                        onClick={() => handleView(sub)}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-400 hover:text-red-600"
                                                        onClick={() => handleDelete(id, sub.petId)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                                {subscriptions.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-48 text-center text-primary-400">
                                            <div className="flex flex-col items-center">
                                                <div className="text-4xl mb-2 text-primary-100">💳</div>
                                                <p>No subscriptions found.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            <SubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                subscription={selectedSub}
            />
        </div>
    );
}
