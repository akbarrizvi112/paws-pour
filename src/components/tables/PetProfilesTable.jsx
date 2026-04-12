import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { PawPrint, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function PetProfilesTable({ pets, onEdit, onDelete, onNutrition }) {
    return (
        <div className="flex flex-col">
            <div className="rounded-xl border border-primary-100 bg-surface overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Pet Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Species</TableHead>
                            <TableHead className="hidden md:table-cell">Breed</TableHead>
                            <TableHead className="hidden md:table-cell">Weight</TableHead>
                            <TableHead className="hidden lg:table-cell">Activity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pets.map((pet, index) => (
                            <TableRow key={pet.id || pet._id}>
                                <TableCell className="text-primary-600 font-medium">{index + 1}</TableCell>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <PawPrint className="w-4 h-4 text-accent" />
                                    {pet.name}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{pet.species}</TableCell>
                                <TableCell className="hidden md:table-cell">{pet.breedCategory || pet.breed || '—'}</TableCell>
                                <TableCell className="hidden md:table-cell">{pet.weight ? `${pet.weight} kg` : '—'}</TableCell>
                                <TableCell className="hidden lg:table-cell">{pet.activityLevel || pet.activity || '—'}</TableCell>
                                <TableCell>
                                    <Badge variant={pet.status === 'Safe' ? 'success' : pet.status === 'Warning' ? 'warning' : (pet.status === 'Rejected' || pet.status === 'Alert') ? 'danger' : 'default'}>
                                        {pet.status || 'Active'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="sm" onClick={() => onNutrition(pet)} title="Nutrition" className="text-success hover:bg-success-soft">
                                            <PawPrint className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => onEdit(pet)} title="Edit">
                                            <Edit className="w-4 h-4 text-primary-600" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => onDelete(pet)} title="Delete" className="text-danger hover:bg-danger-soft">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {pets.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No pet profiles found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
