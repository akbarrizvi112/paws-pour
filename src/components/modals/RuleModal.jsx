import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

const EMPTY_FORM = {
    name: '',
    description: '',
    category: '',
    isActive: true,
};

export function RuleModal({ isOpen, onClose, onSubmit, rule }) {
    const { showToast } = useToast();
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (rule) {
            setFormData({
                name: rule.name || '',
                description: rule.description || '',
                category: rule.category || '',
                isActive: rule.isActive !== undefined ? rule.isActive : rule.status === 'Active',
            });
        } else {
            setFormData(EMPTY_FORM);
        }
    }, [rule, isOpen]);

    if (!isOpen) return null;

    const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // FIX: Preserve existing rule logic (conditions/actions) if present in the original rule
            // but remove them from the UI as requested.
            await onSubmit({
                ...rule, // Keep existing fields like conditions/actions
                name: formData.name,
                description: formData.description,
                category: formData.category,
                isActive: formData.isActive,
            });
            showToast(rule ? 'Rule updated successfully' : 'Rule created successfully');
            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl my-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">
                        {rule ? 'Edit Rule' : 'Create Rule'}
                    </h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Rule Name <span className="text-red-500">*</span></label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => set('name', e.target.value)}
                            placeholder="e.g. No Chocolate for Dogs"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5e6f5e]/40"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={formData.category}
                            onChange={e => set('category', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5e6f5e]/40 bg-white"
                        >
                            <option value="">Select category…</option>
                            <option value="calorie">Calorie</option>
                            <option value="toxic ingredients">Toxic Ingredients</option>
                            <option value="allergy filters">Allergy Filters</option>
                            <option value="dietary restrictions">Dietary Restrictions</option>
                            <option value="portion adjustments">Portion Adjustments</option>
                            <option value="species compatibility">Species Compatibility</option>
                            <option value="activity multiplier">Activity Multiplier</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => set('description', e.target.value)}
                            rows={2}
                            placeholder="Brief explanation of what this rule does…"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5e6f5e]/40"
                        />
                    </div>


                    {/* Active toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.isActive}
                                onChange={e => set('isActive', e.target.checked)}
                            />
                            <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-[#5e6f5e] transition-colors" />
                            <div className="absolute top-0.5 left-0.5 bg-white rounded-full w-5 h-5 shadow transition-transform peer-checked:translate-x-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Active</span>
                    </label>

                    {/* Footer */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-[#5e6f5e] text-white hover:bg-[#4D5B4D] disabled:opacity-50"
                        >
                            {submitting ? 'Saving…' : rule ? 'Update Rule' : 'Create Rule'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
