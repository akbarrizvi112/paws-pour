import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Pagination } from '../ui/Pagination';

export function TreatDatabaseTable({ treats, currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex flex-col">
            <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Treat Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Calories</TableHead>
                            <TableHead className="hidden md:table-cell">Meat Source</TableHead>
                            <TableHead className="hidden lg:table-cell">Grain</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {treats.map((treat) => (
                            <TableRow key={treat.id}>
                                <TableCell className="font-medium">{treat.name}</TableCell>
                                <TableCell className="hidden sm:table-cell">{treat.calories}</TableCell>
                                <TableCell className="hidden md:table-cell">{treat.meatSource}</TableCell>
                                <TableCell className="hidden lg:table-cell">{treat.grain}</TableCell>
                                <TableCell>
                                    <Badge variant={treat.status === 'Approved' ? 'success' : treat.status === 'Pending' ? 'warning' : (treat.status === 'Disabled' || treat.status === 'Rejected') ? 'danger' : 'default'}>
                                        {treat.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        {treats.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No treats found.
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
