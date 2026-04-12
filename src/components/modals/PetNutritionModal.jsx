import { useState, useEffect } from 'react';
import { X, Sparkles, Save, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { nutritionService } from '../../services/nutritionService';

export function PetNutritionModal({ isOpen, onClose, pet }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState(null);

    const fetchNutrition = async () => {
        if (!pet) return;
        try {
            setLoading(true);
            setError(null);
            const data = await nutritionService.getNutritionByPetId(pet.id || pet._id);
            setProfile(data);
        } catch (err) {
            if (err.response?.status === 404) {
                setProfile(null);
            } else {
                setError('Failed to fetch nutrition profile');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && pet) {
            fetchNutrition();
        }
    }, [isOpen, pet]);

    const handleGenerate = async () => {
        try {
            setGenerating(true);
            setError(null);
            const data = await nutritionService.generateNutrition({ petId: pet.id || pet._id });
            setProfile(data);
        } catch (err) {
            setError('Failed to generate nutrition profile');
        } finally {
            setGenerating(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            // Convert numeric fields
            ['targetCalories', 'protein', 'fat', 'carbs', 'fiber'].forEach(field => {
                if (data[field]) data[field] = Number(data[field]);
            });

            if (profile) {
                await nutritionService.updateNutrition(profile.id || profile._id, data);
            } else {
                await nutritionService.createNutrition({ ...data, petId: pet.id || pet._id });
            }
            alert('Nutrition profile saved successfully');
            fetchNutrition();
        } catch (err) {
            alert('Failed to save nutrition profile');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!profile || !window.confirm('Are you sure you want to delete this nutrition profile?')) return;
        try {
            setLoading(true);
            await nutritionService.deleteNutrition(profile.id || profile._id);
            setProfile(null);
        } catch (err) {
            alert('Failed to delete nutrition profile');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const inputClass = "w-full px-4 py-2 rounded-xl border border-primary-100 bg-surface text-primary-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary-100">
                    <div>
                        <h2 className="text-xl font-bold text-primary-900">Nutrition Profile</h2>
                        <p className="text-sm text-primary-600">Managing nutrition for <span className="font-semibold">{pet?.name}</span></p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-primary-50 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-primary-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {loading && !profile ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-20 bg-gray-100 rounded-xl"></div>
                                <div className="h-20 bg-gray-100 rounded-xl"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {!profile && !error && (
                                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center">
                                    <Sparkles className="w-10 h-10 text-primary-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-primary-900 mb-2">No Profile Found</h3>
                                    <p className="text-sm text-primary-600 mb-6">You can generate an AI-powered nutrition profile based on {pet?.name}'s breed, age, and activity level.</p>
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={generating}
                                        className="bg-primary hover:bg-primary-600 text-white w-full flex items-center justify-center gap-2"
                                    >
                                        {generating ? 'Generating...' : (
                                            <>
                                                <Sparkles className="w-4 h-4" />
                                                Generate Profile
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-danger-soft border border-danger-100 rounded-xl flex items-center gap-3 text-danger text-sm">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {(profile || error) && (
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-primary-700 mb-1">Target Daily Calories (kcal)</label>
                                            <input name="targetCalories" type="number" defaultValue={profile?.targetCalories} className={inputClass} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-primary-700 mb-1">Protein (%)</label>
                                            <input name="protein" type="number" step="0.1" defaultValue={profile?.protein} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-primary-700 mb-1">Fat (%)</label>
                                            <input name="fat" type="number" step="0.1" defaultValue={profile?.fat} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-primary-700 mb-1">Carbohydrates (%)</label>
                                            <input name="carbs" type="number" step="0.1" defaultValue={profile?.carbs} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-primary-700 mb-1">Fiber (%)</label>
                                            <input name="fiber" type="number" step="0.1" defaultValue={profile?.fiber} className={inputClass} />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-primary-100 flex items-center justify-between">
                                        {profile && (
                                            <Button type="button" variant="ghost" onClick={handleDelete} className="text-danger hover:bg-danger-soft">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </Button>
                                        )}
                                        <div className="flex gap-3 ml-auto">
                                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                                            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary-600 text-white flex items-center gap-2">
                                                <Save className="w-4 h-4" />
                                                {loading ? 'Saving...' : 'Save Profile'}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
