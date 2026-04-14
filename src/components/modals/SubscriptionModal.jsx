import { X, CreditCard, Calendar, Target, Activity } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function SubscriptionModal({ isOpen, onClose, subscription }) {
    if (!isOpen || !subscription) return null;

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const statusVariant = (status) => {
        const s = (status || '').toUpperCase();
        if (s === 'ACTIVE') return 'success';
        if (s === 'EXPIRED' || s === 'CANCELLED') return 'danger';
        if (s === 'TRIAL') return 'default';
        return 'default';
    };

    const dataRows = [
        { label: 'Status', value: subscription.status || 'UNKNOWN', icon: Activity, isBadge: true },
        { label: 'Pet ID', value: subscription.petId, icon: Target, isCode: true },
        { label: 'Trial Start', value: formatDate(subscription.trialStart), icon: Calendar },
        { label: 'Trial End', value: formatDate(subscription.trialEnd), icon: Calendar },
        { label: 'Estimated Price', value: `$${Number(subscription.estPrice || 0).toFixed(2)}`, icon: CreditCard },
        { label: 'Subscription Type', value: subscription.isTrial ? 'Free Trial' : 'Paid Plan', icon: CreditCard },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                {/* Header */}
                <div className="bg-primary-50 p-6 flex justify-between items-center border-b border-primary-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2.5 rounded-2xl shadow-sm text-primary">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-primary-900">Subscription Details</h2>
                            <p className="text-sm text-primary-600">Overview of current plan</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors text-primary-400 hover:text-primary-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {dataRows.map((row, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-primary-50 bg-[#fcfaf7]/50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-xl text-primary-400">
                                        <row.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-primary-600">{row.label}</span>
                                </div>
                                <div className="text-right">
                                    {row.isBadge ? (
                                        <Badge variant={statusVariant(row.value)}>{row.value}</Badge>
                                    ) : row.isCode ? (
                                        <code className="text-xs text-primary-700 bg-primary-100/50 px-2 py-1 rounded-lg">
                                            {row.value}
                                        </code>
                                    ) : (
                                        <span className="text-sm font-bold text-primary-900">{row.value}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-primary-100">
                        <Button
                            onClick={onClose}
                            className="w-full h-12 bg-primary hover:bg-primary-600 text-white font-bold rounded-2xl shadow-md transition-all active:scale-[0.98]"
                        >
                            Close Details
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
