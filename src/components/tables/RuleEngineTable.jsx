import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

function VersionsDrawer({ ruleId, onClose, getRuleVersions }) {
    const [versions, setVersions] = useState(null);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const data = await getRuleVersions(ruleId);
            setVersions(Array.isArray(data) ? data : []);
        } catch {
            setVersions([]);
        } finally {
            setLoading(false);
        }
    };

    // Load on first render
    if (versions === null && !loading) {
        load();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[70vh] overflow-y-auto shadow-2xl">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-bold text-gray-800">Version History</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
                </div>
                <div className="p-4">
                    {loading && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
                            <span className="animate-spin">⟳</span> Loading versions…
                        </div>
                    )}
                    {!loading && versions !== null && versions.length === 0 && (
                        <p className="text-center text-sm text-gray-400 py-8">No versions found for this rule.</p>
                    )}
                    {!loading && versions && versions.length > 0 && (
                        <ul className="space-y-3">
                            {versions.map((v, i) => (
                                <li key={v.id ?? i} className="rounded-xl border border-gray-100 p-4 text-sm space-y-1 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-700">Version {v.version ?? i + 1}</span>
                                        <span className="text-xs text-gray-400">
                                            {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : '—'}
                                        </span>
                                    </div>
                                    {v.notes && <p className="text-gray-600">{v.notes}</p>}
                                    {v.changes && (
                                        <pre className="text-xs bg-white rounded-lg p-2 border border-gray-100 overflow-auto">
                                            {typeof v.changes === 'string' ? v.changes : JSON.stringify(v.changes, null, 2)}
                                        </pre>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export function RuleEngineTable({ rules, onEdit, onDelete, getRuleVersions, isUnified }) {
    const [versionsRuleId, setVersionsRuleId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const resolveId = (rule) => rule.id ?? rule.ruleId ?? rule._id;
    const resolveStatus = (rule) => {
        if (rule.status) return rule.status;
        if (rule.isActive !== undefined) return rule.isActive ? 'Active' : 'Inactive';
        return 'Unknown';
    };
    const resolveSource = (rule) => rule.source ?? rule.ruleSource ?? '—';

    const handleDelete = async (rule) => {
        const id = resolveId(rule);
        if (!window.confirm(`Delete rule "${rule.name}"?`)) return;
        setDeletingId(id);
        try {
            await onDelete(id);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <>
            <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rule Name</TableHead>
                            <TableHead>Category</TableHead>
                            {isUnified && <TableHead>Source</TableHead>}
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rules.map((rule) => {
                            const id = resolveId(rule);
                            const status = resolveStatus(rule);
                            const isDeleting = deletingId === id;

                            return (
                                <TableRow key={id ?? rule.name} className="transition-opacity">
                                    <TableCell className="font-medium text-primary-900">
                                        <div>{rule.name}</div>
                                        {rule.description && (
                                            <div className="text-xs text-primary-400 mt-0.5 max-w-xs truncate">{rule.description}</div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-primary-600">
                                        {rule.category
                                            ? rule.category.replace(/\b\w/g, c => c.toUpperCase())
                                            : '—'}
                                    </TableCell>
                                    {isUnified && (
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full bg-[#f4ede4] px-2 py-0.5 text-xs font-medium text-[#7a4f35]">
                                                {resolveSource(rule)}
                                            </span>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Badge
                                            variant={
                                                status === 'Active' ? 'success' :
                                                    status === 'Inactive' ? 'danger' : 'default'
                                            }
                                        >
                                            {status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {/* Version History — only for legacy rules (they have UUIDs) */}
                                            {!isUnified && getRuleVersions && id && (
                                                <button
                                                    onClick={() => setVersionsRuleId(id)}
                                                    title="View version history"
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#5e6f5e] hover:bg-[#5e6f5e]/10 transition-colors text-sm"
                                                >
                                                    🕓
                                                </button>
                                            )}
                                            {onEdit && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onEdit(rule)}
                                                    className="text-primary-600 hover:text-primary-900 text-xs"
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                            {onDelete && !isUnified && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(rule)}
                                                    disabled={isDeleting}
                                                    className="text-red-400 hover:text-red-600 text-xs disabled:opacity-50"
                                                >
                                                    {isDeleting ? '…' : 'Delete'}
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {rules.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={isUnified ? 5 : 4} className="h-24 text-center text-primary-400">
                                    No rules configured.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {versionsRuleId && (
                <VersionsDrawer
                    ruleId={versionsRuleId}
                    onClose={() => setVersionsRuleId(null)}
                    getRuleVersions={getRuleVersions}
                />
            )}
        </>
    );
}
