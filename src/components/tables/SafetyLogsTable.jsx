import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { PawPrint, X, Activity, AlertTriangle, Info, Clock, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';
import { useEffect } from 'react';
import { Pagination } from '../ui/Pagination';
import { safetyService } from '../../services/safetyService';
import { Loader } from '../ui/Loader';

// ─── Detail drawer ─────────────────────────────────────────────────────────────

function LogDetailDrawer({ logId, initialLog, onClose }) {
    const [detail, setDetail] = useState(initialLog || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (logId && logId !== 'undefined' && typeof logId === 'string' && logId.length > 5) {
            setLoading(true);
            safetyService.getLogById(logId)
                .then(data => setDetail(data))
                .catch((err) => {
                    console.error("Failed to fetch log details:", err);
                    if (!detail) setDetail(initialLog || {});
                })
                .finally(() => setLoading(false));
        }
    }, [logId]);

    const renderValue = (val) => {
        if (typeof val === 'object' && val !== null) {
            return (
                <pre className="text-[10px] bg-gray-50 p-2 rounded-lg border border-gray-100 mt-1 overflow-x-auto">
                    {JSON.stringify(val, null, 2)}
                </pre>
            );
        }
        return <span className="text-gray-900 font-semibold">{String(val)}</span>;
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Safety Log Detail</h3>
                        <p className="text-xs text-gray-500 font-mono mt-1">ID: {logId}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    {loading && !detail && (
                        <Loader message="Fetching event details..." fullHeight={false} />
                    )}

                    {detail && (
                        <>
                            {/* Key Information Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Action / Event</span>
                                    <span className="text-sm font-bold text-gray-900">{detail.action || detail.event || detail.message || '—'}</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Severity / Level</span>
                                    <div className="mt-1">
                                        <Badge variant={severityVariant(detail.severity || detail.level)}>{detail.severity || detail.level || '—'}</Badge>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Pet Association</span>
                                    <span className="text-sm font-bold text-gray-900">{detail.petId || detail.pet || 'INTERNAL'}</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Timestamp</span>
                                    <span className="text-sm font-bold text-gray-900">{formatDate(detail.timestamp || detail.createdAt || detail.date)}</span>
                                </div>
                            </div>

                            {/* Detailed Metadata / Context */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-700 px-1 border-l-4 border-primary-400 pl-3">Context & Metadata</h4>
                                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <tbody className="divide-y divide-gray-50">
                                            {Object.entries(detail).map(([key, value]) => {
                                                // Skip keys already shown in cards
                                                if (['action', 'event', 'message', 'severity', 'level', 'petId', 'pet', 'timestamp', 'createdAt', 'date', 'logId', 'id', '_id'].includes(key)) return null;
                                                return (
                                                    <tr key={key} className="bg-white">
                                                        <td className="px-4 py-3 text-gray-500 font-medium w-1/3 align-top">{key}</td>
                                                        <td className="px-4 py-3 text-gray-900">{renderValue(value)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Raw Data for Admins */}
                            <div className="space-y-2">
                                <details className="group">
                                    <summary className="text-[11px] font-bold text-gray-400 cursor-pointer hover:text-gray-600 transition-colors list-none flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-open:bg-primary-500"></div>
                                        SHOW RAW JSON DATA
                                    </summary>
                                    <div className="mt-3">
                                        <pre className="text-[10px] bg-gray-900 text-gray-300 rounded-xl p-4 overflow-auto border border-gray-800 whitespace-pre-wrap leading-relaxed shadow-inner">
                                            {JSON.stringify(detail, null, 2)}
                                        </pre>
                                    </div>
                                </details>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <Button onClick={onClose} className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm rounded-2xl h-12 font-bold">
                        Close Log
                    </Button>
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
    const [selectedLog, setSelectedLog] = useState(null);

    const handleViewLog = (log, id) => {
        setSelectedLogId(String(id));
        setSelectedLog(log);
    };

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
                                                onClick={() => handleViewLog(log, logId)}
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
                <LogDetailDrawer
                    logId={selectedLogId}
                    initialLog={selectedLog}
                    onClose={() => {
                        setSelectedLogId(null);
                        setSelectedLog(null);
                    }}
                />
            )}
        </>
    );
}
