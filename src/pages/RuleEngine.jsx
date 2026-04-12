import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { RuleEngineTable } from '../components/tables/RuleEngineTable';
import { RuleModal } from '../components/modals/RuleModal';
import { useRules } from '../hooks/useRules';
import { Button } from '../components/ui/Button';

const CATEGORY_FILTERS = [
    { label: 'All', value: '' },
    { label: 'Calorie', value: 'calorie' },
    { label: 'Species Compatibility', value: 'species compatibility' },
    { label: 'Toxic Ingredients', value: 'toxic ingredients' },
    { label: 'Allergy Filters', value: 'allergy filters' },
    { label: 'Dietary Restrictions', value: 'dietary restrictions' },
    { label: 'Portion Adjustments', value: 'portion adjustments' },
    { label: 'Activity Multiplier', value: 'activity multiplier' },
];

export function RuleEngine() {
    const {
        unifiedRules,
        rules,
        loading,
        error,
        activeTab,
        setActiveTab,
        createRule,
        deleteRule,
        patchUnifiedRule,
        getRuleVersions,
        refetch,
    } = useRules();

    const [categoryFilter, setCategoryFilter] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [actionError, setActionError] = useState(null);

    const isUnified = activeTab === 'unified';
    const rawList = isUnified ? unifiedRules : rules;

    // Case-insensitive match — backend returns lowercase (e.g. "calorie")
    const displayedRules = categoryFilter
        ? rawList.filter(r => (r.category ?? '').toLowerCase() === categoryFilter.toLowerCase())
        : rawList;

    // ─── Modal handlers ───────────────────────────────────────────────────────

    const openCreate = () => {
        setEditingRule(null);
        setModalOpen(true);
    };

    const openEdit = (rule) => {
        setEditingRule(rule);
        setModalOpen(true);
    };

    const handleModalSubmit = async (payload) => {
        setActionError(null);
        try {
            if (editingRule) {
                // For unified rules, use PATCH unified endpoint
                if (isUnified) {
                    const source = editingRule.source ?? editingRule.ruleSource ?? 'activity_multiplier';
                    const id = editingRule.id ?? editingRule.ruleId;
                    await patchUnifiedRule(source, id, payload);
                } else {
                    // Legacy rules: create a new version with updated payload
                    // (no standalone "update" endpoint — version endpoint acts as the update)
                    const ruleId = editingRule.id ?? editingRule.ruleId;
                    await createRule({ ...payload, ruleId });
                }
            } else {
                await createRule(payload);
            }
            setModalOpen(false);
        } catch (err) {
            setActionError(err?.response?.data?.message ?? err.message ?? 'Request failed');
            throw err; // keep modal open for user to retry
        }
    };

    const handleDelete = async (ruleId) => {
        setActionError(null);
        try {
            await deleteRule(ruleId);
        } catch (err) {
            setActionError(err?.response?.data?.message ?? err.message ?? 'Delete failed');
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <PageHeader
                title="Rule Engine"
                description="Configure safety and dietary rules applied across the platform."
            />

            {/* Tabs */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex gap-2 p-1 bg-[#f4ede4]/60 rounded-2xl">
                    <button
                        onClick={() => setActiveTab('unified')}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${isUnified
                            ? 'bg-[#5e6f5e] text-white shadow-sm'
                            : 'text-[#4a3420] hover:bg-[#5e6f5e]/10'
                            }`}
                    >
                        Unified Rules
                    </button>
                    <button
                        onClick={() => setActiveTab('legacy')}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${!isUnified
                            ? 'bg-[#5e6f5e] text-white shadow-sm'
                            : 'text-[#4a3420] hover:bg-[#5e6f5e]/10'
                            }`}
                    >
                        Legacy Rules
                    </button>
                </div>

                {/* Create button — only for legacy rules */}
                {!isUnified && (
                    <Button
                        onClick={openCreate}
                        className="bg-[#5e6f5e] text-white hover:bg-[#4D5B4D] shadow-sm font-semibold"
                    >
                        + New Rule
                    </Button>
                )}
            </div>

            {/* Category filter chips */}
            <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => setCategoryFilter(value === categoryFilter ? '' : value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${categoryFilter === value
                            ? 'bg-[#5e6f5e] text-white border-[#5e6f5e]'
                            : 'bg-[#f4ede4] text-[#4a3420] border-transparent hover:border-[#5e6f5e]/40'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Error banner */}
            {actionError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex justify-between items-center">
                    <span>{actionError}</span>
                    <button onClick={() => setActionError(null)} className="ml-4 text-red-400 hover:text-red-600">&times;</button>
                </div>
            )}
            {error && !actionError && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700 flex justify-between items-center">
                    <span>Could not load live rules — showing cached data.</span>
                    <button onClick={refetch} className="ml-4 underline text-amber-600 hover:text-amber-800">Retry</button>
                </div>
            )}

            {/* Table */}
            <div className="mt-2">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium text-primary-600">
                        {isUnified ? 'All Sources' : 'Configured Legacy Rules'}
                        {displayedRules.length > 0 && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-[#5e6f5e]/10 text-[#5e6f5e] rounded-full font-semibold">
                                {displayedRules.length}
                            </span>
                        )}
                    </h2>
                    <button
                        onClick={refetch}
                        className="text-xs text-primary-400 hover:text-primary-700 transition-colors"
                        title="Refresh"
                    >
                        ↻ Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="h-64 rounded-2xl bg-surface border border-primary-100 animate-pulse" />
                ) : (
                    <RuleEngineTable
                        rules={displayedRules}
                        isUnified={isUnified}
                        onEdit={openEdit}
                        onDelete={!isUnified ? handleDelete : undefined}
                        getRuleVersions={!isUnified ? getRuleVersions : undefined}
                    />
                )}
            </div>

            {/* Create / Edit Modal */}
            <RuleModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                rule={editingRule}
            />
        </div>
    );
}
