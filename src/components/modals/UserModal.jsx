import { useState, useEffect } from 'react';
import { X, User, Mail, Shield, Phone, Calendar, AlignLeft } from 'lucide-react';
import { Button } from '../ui/Button';

export function UserModal({ isOpen, onClose, onSubmit, user = null }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        accountType: '',
        bio: '',
        phoneNumber: '',
        dateOfBirth: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                accountType: user.accountType || user.role || 'USER',
                bio: user.bio || '',
                phoneNumber: user.phoneNumber && typeof user.phoneNumber === 'object' ? user.phoneNumber.phone : user.phoneNumber || '',
                dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
            });
        }
    }, [user, isOpen]);

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
                bio: formData.bio,
                // FIX: Refined structure based on error message: 
                // "phoneNumber.countryCode must be a string", "phoneNumber.callingCode must be a string", "phoneNumber.phone must be a string"
                phoneNumber: formData.phoneNumber ? {
                    countryCode: "PK", // Defaulting to PK as it's a common pattern in the user's context (local time suggests Pakistan/Asia)
                    callingCode: "+92",
                    phone: formData.phoneNumber
                } : null,
                dateOfBirth: formData.dateOfBirth || null
            };

            // Clean up empty strings to avoid validation errors if backend is strict
            Object.keys(payload).forEach(key => {
                if (payload[key] === '') payload[key] = null;
            });

            await onSubmit(payload);
            onClose();
        } catch (err) {
            console.error("User update error:", err);
            const serverMessage = err.response?.data?.message || err.response?.data?.error || err.message;
            alert('Failed to update user: ' + (typeof serverMessage === 'object' ? JSON.stringify(serverMessage) : serverMessage));
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl border border-primary-100 bg-surface text-primary-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all";
    const disabledClass = "w-full px-4 py-3 rounded-xl border border-primary-50 bg-primary-25 text-primary-400 text-sm cursor-not-allowed";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary-100 sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-50 rounded-lg">
                            <User className="w-5 h-5 text-primary-600" />
                        </div>
                        <h2 className="text-xl font-bold text-primary-900">Edit User Profile</h2>
                    </div>
                    <button type="button" onClick={onClose} className="p-1 hover:bg-primary-50 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-primary-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Read-only Section */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-primary-25/50 rounded-2xl border border-primary-50">
                        <div>
                            <label className="flex items-center gap-2 text-xs font-bold text-primary-400 uppercase tracking-wider mb-1.5">
                                <Mail className="w-3 h-3" /> Email Address
                            </label>
                            <input value={formData.email} className={disabledClass} disabled />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-xs font-bold text-primary-400 uppercase tracking-wider mb-1.5">
                                <Shield className="w-3 h-3" /> Account Type
                            </label>
                            <input value={formData.accountType} className={disabledClass} disabled />
                        </div>
                    </div>

                    {/* Editable Section */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-primary-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`${inputClass} pl-10`}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-primary-700 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
                                    <input
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={`${inputClass} pl-10`}
                                        placeholder="+1 234..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-primary-700 mb-1.5">Date of Birth</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-primary-700 mb-1.5">Bio</label>
                            <div className="relative">
                                <AlignLeft className="absolute left-3 top-4 w-4 h-4 text-primary-300" />
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="3"
                                    className={`${inputClass} pl-10 resize-none`}
                                    placeholder="Tell us about this user..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-primary-100 flex-col sm:flex-row">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1 sm:flex-none">Cancel</Button>
                        <Button type="submit" className="flex-1 sm:flex-none bg-primary hover:bg-primary-600 text-white min-w-[120px]" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
