import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { PawPrint } from 'lucide-react';
import { Pagination } from '../ui/Pagination';

export function SafetyLogsTable({ logs, currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex flex-col h-full">
            <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm flex-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pet</TableHead>
                            <TableHead className="hidden sm:table-cell">Species</TableHead>
                            <TableHead className="hidden md:table-cell">Ingredient</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <PawPrint className="w-4 h-4 text-accent" />
                                    {log.pet}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-primary-600">{log.species}</TableCell>
                                <TableCell className="hidden md:table-cell text-primary-900 font-medium">{log.ingredient}</TableCell>
                                <TableCell className="text-primary-600">{log.date}</TableCell>
                            </TableRow>
                        ))}
                        {logs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No safety logs found.
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
    );
}
