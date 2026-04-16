import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';


export function RuleEngineTable({ rules, onEdit, onDelete, isUnified, hideActions = false }) {
    const [deletingId, setDeletingId] = useState(null);

    const resolveId = (rule) => rule.id ?? rule.ruleId ?? rule._id;
    const resolveStatus = (rule) => {
        // FIX: Prioritize isActive boolean over the status string to ensure 
        // the UI reflects recent updates immediately.
        if (rule.isActive !== undefined) return rule.isActive ? 'Active' : 'Inactive';
        if (rule.status) return rule.status;
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
                            {!hideActions && <TableHead className="text-right">Actions</TableHead>}
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
                                    {!hideActions && (
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
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
                                    )}
                                </TableRow>
                            );
                        })}

                        {rules.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3 + (isUnified ? 1 : 0) + (hideActions ? 0 : 1)} className="h-24 text-center text-primary-400">
                                    No rules configured.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </>
    );
}
