import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Pagination } from '../ui/Pagination';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function TreatDatabaseTable({ treats, currentPage, totalPages, onPageChange, onEdit, onDelete }) {
    return (
        <div className="flex flex-col">
            <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Treat Name</TableHead>
                            <TableHead className="hidden lg:table-cell">Price</TableHead>
                            <TableHead className="hidden lg:table-cell">Unit (g)</TableHead>
                            <TableHead className="hidden md:table-cell">Fat %</TableHead>
                            <TableHead className="hidden md:table-cell">Moist. %</TableHead>
                            <TableHead className="hidden sm:table-cell">Calories</TableHead>
                            <TableHead className="hidden xl:table-cell">Meat Source</TableHead>
                            <TableHead className="hidden xl:table-cell">Grain Status</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {treats.map((treat, index) => (
                            <TableRow key={treat.id || treat._id || `treat-${index}`}>
                                <TableCell className="font-medium">
                                    {treat.name}
                                    <div className="text-xs text-gray-500 xl:hidden">{treat.meatSource} &bull; {treat.grainStatus}</div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">${treat.pricePerUnit}</TableCell>
                                <TableCell className="hidden lg:table-cell">{treat.gramsPerUnit}g</TableCell>
                                <TableCell className="hidden md:table-cell">{treat.fatPercent}%</TableCell>
                                <TableCell className="hidden md:table-cell">{treat.moisturePercent}%</TableCell>
                                <TableCell className="hidden sm:table-cell">{treat.kcalPerGram}</TableCell>
                                <TableCell className="hidden xl:table-cell">{treat.meatSource}</TableCell>
                                <TableCell className="hidden xl:table-cell">{treat.grainStatus}</TableCell>
                                <TableCell>
                                    <Badge variant={treat.isActive ? 'success' : 'danger'}>
                                        {treat.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {onEdit && (
                                            <Button variant="ghost" size="sm" onClick={() => onEdit(treat)} className="h-8 w-8 p-0">
                                                <Edit className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Button variant="ghost" size="sm" onClick={() => onDelete(treat)} className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
                                                <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {treats.length === 0 && (
                            <TableRow key="no-treats-row">
                                <TableCell colSpan={10} className="h-24 text-center">
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
