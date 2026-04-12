import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { SafetyLogsTable } from '../components/tables/SafetyLogsTable';
import { useSafetyLogs } from '../hooks/useSafetyLogs';
import { Button } from '../components/ui/Button';
import { RefreshCw, FilterX } from 'lucide-react';

export function SafetyLogs() {
    const [petFilter, setPetFilter] = useState(null);
    const { logs, loading, error, refetch } = useSafetyLogs(petFilter);

    const handlePetFilter = (petId) => {
        setPetFilter(petId);
    };

    const clearFilter = () => {
        setPetFilter(null);
    };

    const handleExport = () => {
        if (logs.length === 0) return;

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `safety_logs_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title="Safety Logs"
                description={petFilter ? `Filter history for Pet ID: ${petFilter.slice(0, 8)}...` : "Detailed history of safety blocks and system interventions."}
                action={
                    <div className="flex gap-2">
                        {petFilter && (
                            <Button
                                variant="outline"
                                onClick={clearFilter}
                                className="text-secondary-600 border-secondary-200 hover:bg-secondary-50"
                            >
                                <FilterX className="w-4 h-4 mr-2" />
                                Clear Filter
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={refetch}
                            disabled={loading}
                            className="text-primary-900 border-primary-500"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleExport}
                            disabled={loading || logs.length === 0}
                            className="bg-primary-600 text-white"
                        >
                            Export JSON
                        </Button>
                    </div>
                }
            />

            {error && (
                <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-red-700 text-sm flex justify-between items-center">
                    <span>{error}</span>
                    <Button variant="ghost" size="sm" onClick={refetch} className="text-red-700 hover:bg-red-100">
                        Retry
                    </Button>
                </div>
            )}

            {loading ? (
                <div className="h-96 rounded-2xl bg-surface border border-primary-100 animate-pulse flex items-center justify-center">
                    <div className="text-primary-300 flex flex-col items-center">
                        <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                        <span>Fetching audit logs...</span>
                    </div>
                </div>
            ) : (
                <SafetyLogsTable
                    logs={logs}
                    currentPage={1}
                    totalPages={1}
                    onPageChange={() => { }}
                    onPetFilter={handlePetFilter}
                />
            )}
        </div>
    );
}
