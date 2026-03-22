import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { PawPrint } from 'lucide-react';
import { Pagination } from '../ui/Pagination';

export function PetProfilesTable({ pets, currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex flex-col">
            <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pet Name</TableHead>
                            <TableHead>Species</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pets.map((pet) => (
                            <TableRow key={pet.id}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <PawPrint className="w-4 h-4 text-accent" />
                                    {pet.name}
                                </TableCell>
                                <TableCell>{pet.species}</TableCell>
                                <TableCell>{pet.weight}</TableCell>
                                <TableCell>{pet.activity}</TableCell>
                                <TableCell>
                                    <Badge variant={pet.status === 'Safe' ? 'success' : pet.status === 'Warning' ? 'warning' : 'danger'}>
                                        {pet.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        {pets.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No pet profiles found.
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
