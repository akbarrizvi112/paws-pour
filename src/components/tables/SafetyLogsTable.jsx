import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { PawPrint } from 'lucide-react';
import { Pagination } from '../ui/Pagination';
import { safetyService } from '../../services/safetyService';

// ─── Detail drawer ─────────────────────────────────────────────────────────────

function LogDetailDrawer({ logId, onClose }) {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!detail && !loading) {
        setLoading(true);
        safetyService.getLogById(logId)
            .then(data => setDetail(data))
            .catch(() => setDetail({}))
            .finally(() => setLoading(false));
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[70vh] overflow-y-auto shadow-2xl">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-bold text-gray-800">Log Detail</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
                </div>
                <div className="p-5">
                    {loading && (
                        <div className="flex justify-center py-8 text-sm text-gray-400">
                            <span className="animate-spin mr-2">⟳</span> Loading…
                        </div>
                    )}
                    {!loading && detail && (
                        <pre className="text-xs bg-gray-50 rounded-xl p-4 overflow-auto border border-gray-100 whitespace-pre-wrap">
                            {JSON.stringify(detail, null, 2)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-US', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function shortId(id) {
    if (!id) return '—';
    return id.slice(0, 8) + '…';
}

function severityVariant(severity) {
    const s = (severity ?? '').toLowerCase();
    if (s === 'high' || s === 'critical' || s === 'error') return 'danger';
    if (s === 'medium' || s === 'warn' || s === 'warning') return 'default';
    if (s === 'low' || s === 'info') return 'success';
    return 'default';
}

// ─── Table component ────────────────────────────────────────────────────────────

export function SafetyLogsTable({ logs, currentPage, totalPages, onPageChange, onPetFilter }) {
    const [selectedLogId, setSelectedLogId] = useState(null);

    return (
        <>
            <div className="flex flex-col h-full">
                <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm flex-1">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Log ID</TableHead>
                                <TableHead>Pet ID</TableHead>
                                <TableHead className="hidden sm:table-cell">Action / Event</TableHead>
                                <TableHead className="hidden md:table-cell">Severity</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead className="text-right">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log, i) => {
                                const logId = log.logId ?? log.id ?? log._id ?? i;
                                const petId = log.petId ?? log.pet ?? null;
                                const action = log.action ?? log.event ?? log.description ?? log.message ?? '—';
                                const sev = log.severity ?? log.level ?? null;
                                const ts = log.timestamp ?? log.createdAt ?? log.date ?? null;

                                return (
                                    <TableRow key={logId} className="hover:bg-primary-50/40 transition-colors">
                                        <TableCell>
                                            <span
                                                title={String(logId)}
                                                className="font-mono text-xs text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md cursor-help"
                                            >
                                                {shortId(String(logId))}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {petId ? (
                                                <button
                                                    title={petId}
                                                    onClick={() => onPetFilter?.(petId)}
                                                    className="flex items-center gap-1.5 font-mono text-xs text-[#5e6f5e] hover:underline"
                                                >
                                                    <PawPrint className="w-3.5 h-3.5" />
                                                    {shortId(petId)}
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-primary-800 max-w-[200px] truncate" title={action}>
                                            {action}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {sev ? (
                                                <Badge variant={severityVariant(sev)}>
                                                    {sev}
                                                </Badge>
                                            ) : (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-primary-500 text-xs whitespace-nowrap">
                                            {formatDate(ts)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button
                                                onClick={() => setSelectedLogId(String(logId))}
                                                className="text-xs text-primary-400 hover:text-[#5e6f5e] font-medium transition-colors"
                                            >
                                                View →
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {logs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-primary-400">
                                        No audit logs found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                )}
            </div>

            {selectedLogId && (
                <LogDetailDrawer logId={selectedLogId} onClose={() => setSelectedLogId(null)} />
            )}
        </>
    );
}
