import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

export function PetModal({ isOpen, onClose, onSubmit, pet = null }) {
    const isEdit = !!pet;
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        species: '',
        weight: '',
        activityLevel: '',
        breedCategory: '',
        bodyConditionScore: '',
        profilePicture: '',
        conditions: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (pet) {
            setFormData({
                name: pet.name || '',
                age: pet.age || '',
                species: pet.species || '',
                weight: pet.weight || '',
                activityLevel: pet.activityLevel || '',
                breedCategory: pet.breedCategory || '',
                bodyConditionScore: pet.bodyConditionScore || '',
                profilePicture: pet.profilePicture || '',
                conditions: Array.isArray(pet.conditions) ? pet.conditions.join(', ') : '',
            });
        } else {
            setFormData({
                name: '',
                age: '',
                species: '',
                weight: '',
                activityLevel: '',
                breedCategory: '',
                bodyConditionScore: '',
                profilePicture: '',
                conditions: ''
            });
        }
    }, [pet, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                species: formData.species,
                age: formData.age ? Number(formData.age) : undefined,
                weight: formData.weight ? Number(formData.weight) : undefined,
                activityLevel: formData.activityLevel,
                breedCategory: formData.breedCategory,
                bodyConditionScore: formData.bodyConditionScore ? Number(formData.bodyConditionScore) : undefined,
                profilePicture: formData.profilePicture,
                conditions: formData.conditions ? formData.conditions.split(',').map(c => c.trim()).filter(Boolean) : [],
            };

            // FIX: Remove empty strings/undefined that might trigger 400s
            Object.keys(payload).forEach(key => {
                if (payload[key] === '' || payload[key] === undefined) {
                    delete payload[key];
                }
            });

            console.log("PET MODAL SUBMITTING:", payload);
            await onSubmit(payload);
            onClose();
        } catch (err) {
            console.error("PET MODAL SUBMIT ERROR:", err);
            alert('Operation failed: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl border border-primary-100 bg-surface text-primary-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-primary-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-primary-900">
                        {isEdit ? 'Edit Pet Profile' : 'Add New Pet'}
                    </h2>
                    <button type="button" onClick={onClose} className="p-1 hover:bg-primary-50 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-primary-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-primary-700 mb-1">Pet Name *</label>
                            <input name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="e.g. Max" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary-700 mb-1">Species *</label>
                            <select
                                name="species"
                                value={formData.species}
                                onChange={handleChange}
                                className={`${inputClass} bg-white`}
                                required
                            >
                                <option value="">Select Species...</option>
                                <option value="DOG">DOG</option>
                                <option value="CAT">CAT</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary-700 mb-1">Breed Category</label>
                            <select
                                name="breedCategory"
                                value={formData.breedCategory}
                                onChange={handleChange}
                                className={`${inputClass} bg-white`}
                            >
                                <option value="">Select Breed Category...</option>
                                <option value="SMALL">SMALL</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="LARGE">LARGE</option>
                                <option value="GIANT">GIANT</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary-700 mb-1">Age (years)</label>
                            <input name="age" type="number" step="any" value={formData.age} onChange={handleChange} className={inputClass} placeholder="e.g. 2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary-700 mb-1">Weight (kg)</label>
                            <input name="weight" type="number" step="any" value={formData.weight} onChange={handleChange} className={inputClass} placeholder="e.g. 25.5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary-700 mb-1">Body Condition Score</label>
                            <select
                                name="bodyConditionScore"
                                value={formData.bodyConditionScore}
                                onChange={handleChange}
                                className={`${inputClass} bg-white`}
                            >
                                <option value="">Select Score (1-9)...</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-primary-700 mb-1">Activity Level</label>
                            <select
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                                className={`${inputClass} bg-white`}
                            >
                                <option value="">Select Activity Level...</option>
                                <option value="NEUTERED_ADULT">NEUTERED_ADULT</option>
                                <option value="INTACT_ADULT">INTACT_ADULT</option>
                                <option value="INACTIVE">INACTIVE</option>
                                <option value="WEIGHT_LOSS">WEIGHT_LOSS</option>
                                <option value="PUPPY">PUPPY</option>
                                <option value="KITTEN">KITTEN</option>
                                <option value="GESTATION">GESTATION</option>
                                <option value="LACTATION">LACTATION</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-primary-700 mb-1">Profile Picture URL</label>
                            <input name="profilePicture" value={formData.profilePicture} onChange={handleChange} className={inputClass} placeholder="https://..." />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-primary-700 mb-1">Conditions</label>
                            <input name="conditions" value={formData.conditions} onChange={handleChange} className={inputClass} placeholder="Comma-separated e.g. pancreatitis, kidney_disease" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-primary-100 mt-4">
                        <Button type="button" variant="outline" onClick={onClose} className="px-6">Cancel</Button>
                        <Button type="submit" className="bg-primary hover:bg-primary-600 text-white px-6" disabled={loading}>
                            {loading ? 'Saving...' : (isEdit ? 'Update Pet' : 'Add Pet')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
