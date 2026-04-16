import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useIngredients } from '../hooks/useIngredients';
import { Button } from '../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Search, Filter, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { TableRowLoader } from '../components/ui/Loader';

export function Ingredients() {
    const [filters, setFilters] = useState({ isToxic: '', grainStatus: '', meatSource: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const { ingredients, loading, deleteIngredient, refetch } = useIngredients(filters);
    const { showToast } = useToast();

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this ingredient?')) return;
        try {
            await deleteIngredient(id);
            refetch();
            showToast('Ingredient deleted successfully');
        } catch (err) {
            alert('Failed to delete ingredient: ' + err.message);
        }
    };

    const filteredData = (Array.isArray(ingredients) ? ingredients : []).filter(ing =>
        ing.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-12">
            <PageHeader
                title="Ingredient Database"
                description="Manage nutritional ingredients and safety rules."
                action={
                    <Button className="bg-[#5e6f5e] hover:bg-[#4D5B4D] text-white flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Ingredient
                    </Button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                    <input
                        type="text"
                        placeholder="Search ingredients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-primary-100 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                </div>
                <select
                    className="rounded-xl border border-primary-100 bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    value={filters.meatSource}
                    onChange={(e) => setFilters({ ...filters, meatSource: e.target.value })}
                >
                    <option value="">All Protein Sources</option>
                    <option value="Beef">Beef</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Fish">Fish</option>
                </select>
                <select
                    className="rounded-xl border border-primary-100 bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                    value={filters.grainStatus}
                    onChange={(e) => setFilters({ ...filters, grainStatus: e.target.value })}
                >
                    <option value="">All Grain Status</option>
                    <option value="Grain Free">Grain Free</option>
                    <option value="Contains Grain">Contains Grain</option>
                </select>
            </div>

            <div className="rounded-2xl border border-primary-100 bg-surface shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ingredient Name</TableHead>
                            <TableHead>Protein Source</TableHead>
                            <TableHead>Grain Status</TableHead>
                            <TableHead>Safety</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRowLoader colSpan={5} />
                        ) : filteredData.length > 0 ? (
                            filteredData.map((ing) => (
                                <TableRow key={ing.id || ing._id}>
                                    <TableCell className="font-medium text-primary-900">{ing.name}</TableCell>
                                    <TableCell>{ing.meatSource || 'N/A'}</TableCell>
                                    <TableCell>{ing.grainStatus || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge variant={ing.isToxic ? 'danger' : 'success'}>
                                            {ing.isToxic ? 'Toxic' : 'Safe'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" title="Edit">
                                                <Edit className="w-4 h-4 text-primary-600" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-danger hover:bg-danger-soft"
                                                title="Delete"
                                                onClick={() => handleDelete(ing.id || ing._id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-primary-500">
                                    No ingredients found matching your criteria.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
