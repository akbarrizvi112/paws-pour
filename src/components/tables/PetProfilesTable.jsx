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
                            <TableHead className="hidden sm:table-cell">Species</TableHead>
                            <TableHead className="hidden md:table-cell">Weight</TableHead>
                            <TableHead className="hidden lg:table-cell">Activity</TableHead>
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
                                <TableCell className="hidden sm:table-cell">{pet.species}</TableCell>
                                <TableCell className="hidden md:table-cell">{pet.weight}</TableCell>
                                <TableCell className="hidden lg:table-cell">{pet.activity}</TableCell>
                                <TableCell>
                                    <Badge variant={pet.status === 'Safe' ? 'success' : pet.status === 'Warning' ? 'warning' : (pet.status === 'Rejected' || pet.status === 'Alert') ? 'danger' : 'default'}>
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
