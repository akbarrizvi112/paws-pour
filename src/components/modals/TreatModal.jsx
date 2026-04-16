import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { ingredientService } from '../../services/ingredientService';
import { ChevronDown, Check, X } from 'lucide-react';

export function TreatModal({ isOpen, onClose, onSubmit, treat }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        fatPercent: '',
        moisturePercent: '',
        kcalPerGram: '',
        meatSource: '',
        grainStatus: '',
        pricePerUnit: '',
        gramsPerUnit: '',
        sodiumMgPerKg: '',
        copperMgPerKg: '',
        vitaminDIUPerKg: '',
        phosphorusMgPerKg: '',
        isActive: true,
        ingredientIds: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loadingIngredients, setLoadingIngredients] = useState(false);

    useEffect(() => {
        if (treat) {
            setFormData({
                name: treat.name || '',
                description: treat.description || '',
                fatPercent: treat.fatPercent || '',
                moisturePercent: treat.moisturePercent || '',
                kcalPerGram: treat.kcalPerGram || '',
                meatSource: treat.meatSource || '',
                grainStatus: treat.grainStatus || '',
                pricePerUnit: treat.pricePerUnit || '',
                gramsPerUnit: treat.gramsPerUnit || '',
                sodiumMgPerKg: treat.sodiumMgPerKg || '',
                copperMgPerKg: treat.copperMgPerKg || '',
                vitaminDIUPerKg: treat.vitaminDIUPerKg || '',
                phosphorusMgPerKg: treat.phosphorusMgPerKg || '',
                isActive: treat.isActive !== undefined ? treat.isActive : true,
                ingredientIds: treat.ingredientIds && Array.isArray(treat.ingredientIds) ? treat.ingredientIds.join(', ') : ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                fatPercent: '',
                moisturePercent: '',
                kcalPerGram: '',
                meatSource: '',
                grainStatus: '',
                pricePerUnit: '',
                gramsPerUnit: '',
                sodiumMgPerKg: '',
                copperMgPerKg: '',
                vitaminDIUPerKg: '',
                phosphorusMgPerKg: '',
                isActive: true,
                ingredientIds: ''
            });
        }
    }, [treat, isOpen]);

    useEffect(() => {
        if (isOpen) {
            const fetchIngredients = async () => {
                setLoadingIngredients(true);
                try {
                    const data = await ingredientService.getIngredients();
                    setAvailableIngredients(data || []);
                } catch (error) {
                    console.error("Failed to fetch ingredients:", error);
                } finally {
                    setLoadingIngredients(false);
                }
            };
            fetchIngredients();
        }
    }, [isOpen]);

    const toggleIngredient = (id) => {
        const currentIds = formData.ingredientIds ? formData.ingredientIds.split(', ').filter(i => i) : [];
        let newIds;
        if (currentIds.includes(id)) {
            newIds = currentIds.filter(item => item !== id);
        } else {
            newIds = [...currentIds, id];
        }
        setFormData({ ...formData, ingredientIds: newIds.join(', ') });
    };

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Parse ingredients if provided
            const parsedIngredients = formData.ingredientIds
                ? formData.ingredientIds.split(',').map(i => i.trim()).filter(i => i)
                : [];

            const submissionData = {
                // FIX: Support treatId, treat_id, id, _id for max robustness
                treatId: treat?.treatId || treat?.treatID || treat?.treat_id || treat?.id || treat?._id,
                name: formData.name,
                description: formData.description,
                meatSource: formData.meatSource,
                grainStatus: formData.grainStatus,
                fatPercent: parseFloat(formData.fatPercent) || 0,
                moisturePercent: parseFloat(formData.moisturePercent) || 0,
                kcalPerGram: parseFloat(formData.kcalPerGram) || 0,
                pricePerUnit: parseFloat(formData.pricePerUnit) || 0,
                gramsPerUnit: parseFloat(formData.gramsPerUnit) || 0,
                sodiumMgPerKg: parseFloat(formData.sodiumMgPerKg) || 0,
                copperMgPerKg: parseFloat(formData.copperMgPerKg) || 0,
                vitaminDIUPerKg: parseFloat(formData.vitaminDIUPerKg) || 0,
                phosphorusMgPerKg: parseFloat(formData.phosphorusMgPerKg) || 0,
                ingredientIds: parsedIngredients,
                isActive: formData.isActive
            };

            await onSubmit(submissionData);
            onClose();
        } catch (error) {
            console.error("Treat submission failed:", error);
            alert("Operation failed: " + (error.response?.data?.message || error.message || "Unknown error"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl my-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">{treat ? 'Edit Treat' : 'Add New Treat'}</h2>
                    <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 col-span-2">
                            <label className="text-sm font-medium text-gray-700">Treat Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>
                        <div className="space-y-1 col-span-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                                rows="2"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Meat Source</label>
                            <select
                                value={formData.meatSource}
                                onChange={(e) => setFormData({ ...formData, meatSource: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
                            >
                                <option value="">Select Meat Source...</option>
                                <option value="Poultry">Poultry</option>
                                <option value="Beef">Beef</option>
                                <option value="Fish">Fish</option>
                                <option value="Lamb">Lamb</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Grain Status</label>
                            <select
                                value={formData.grainStatus}
                                onChange={(e) => setFormData({ ...formData, grainStatus: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
                            >
                                <option value="">Select Grain Status...</option>
                                <option value="Grain Free">Grain Free</option>
                                <option value="With Grain">With Grain</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Calories (kcal/g)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.kcalPerGram}
                                onChange={(e) => setFormData({ ...formData, kcalPerGram: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Fat (%)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.fatPercent}
                                onChange={(e) => setFormData({ ...formData, fatPercent: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Moisture (%)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.moisturePercent}
                                onChange={(e) => setFormData({ ...formData, moisturePercent: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Price Per Unit</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.pricePerUnit}
                                onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Grams Per Unit</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.gramsPerUnit}
                                onChange={(e) => setFormData({ ...formData, gramsPerUnit: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Sodium (mg/kg)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.sodiumMgPerKg}
                                onChange={(e) => setFormData({ ...formData, sodiumMgPerKg: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Copper (mg/kg)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.copperMgPerKg}
                                onChange={(e) => setFormData({ ...formData, copperMgPerKg: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Vitamin D (IU/kg)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.vitaminDIUPerKg}
                                onChange={(e) => setFormData({ ...formData, vitaminDIUPerKg: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Phosphorus (mg/kg)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.phosphorusMgPerKg}
                                onChange={(e) => setFormData({ ...formData, phosphorusMgPerKg: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            />
                        </div>

                        <div className="space-y-1 col-span-2 relative">
                            <label className="text-sm font-medium text-gray-700">Ingredient IDs (Multi-select)</label>
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white min-h-[42px] cursor-pointer flex items-center justify-between"
                            >
                                <span className="text-sm text-gray-600 truncate mr-2">
                                    {formData.ingredientIds || 'Select ingredients...'}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
                                    {loadingIngredients ? (
                                        <div className="p-4 text-center text-xs text-gray-400">Loading ingredients...</div>
                                    ) : availableIngredients.length === 0 ? (
                                        <div className="p-4 text-center text-xs text-gray-400">No ingredients found</div>
                                    ) : (
                                        availableIngredients.map((ing) => {
                                            const id = ing.ingId || ing.id;
                                            const isSelected = formData.ingredientIds.split(', ').includes(id);
                                            return (
                                                <div
                                                    key={id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleIngredient(id);
                                                    }}
                                                    className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50 text-gray-600'}`}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">{ing.name}</span>
                                                        <span className="text-[10px] opacity-70">{id}</span>
                                                    </div>
                                                    {isSelected && <Check className="w-4 h-4" />}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                            {isDropdownOpen && <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>}
                        </div>

                        <div className="space-y-1">
                            <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Is Active</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100 mt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
                        <Button type="submit" className="flex-1 bg-primary text-white hover:bg-primary-600" disabled={submitting}>
                            {submitting ? 'Saving...' : (treat ? 'Update' : 'Create')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
