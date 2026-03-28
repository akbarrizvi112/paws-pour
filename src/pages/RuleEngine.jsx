import { PageHeader } from '../components/layout/PageHeader';
import { RuleEngineTable } from '../components/tables/RuleEngineTable';
import { useRules } from '../hooks/useRules';
import { Button } from '../components/ui/Button';

export function RuleEngine() {
    const { rules, loading } = useRules();

    return (
        <div className="space-y-8 pb-12">
            <PageHeader
                title="Rule Engine"
                description="Configure safety and dietary rules applied across the platform."
            />

            <div className="flex gap-4">
                <Button className="bg-[#5e6f5e] text-white hover:bg-[#4D5B4D] shadow-sm font-semibold">Species Compatibility</Button>
                <Button className="bg-[#f4ede4] text-[#4a3420] hover:bg-[#b05d41] hover:text-white shadow-sm font-semibold">Toxic Ingredients</Button>
                <Button className="bg-[#fdebdd] text-[#4a3420] hover:bg-[#4D5B4D] hover:text-white shadow-sm font-semibold">Allergy Filters</Button>
            </div>

            <div className="mt-8">
                <h2 className="text-sm font-medium text-primary-600 mb-4">Showing Configured Rules</h2>
                {loading ? (
                    <div className="h-96 rounded-2xl bg-surface border border-primary-100 animate-pulse"></div>
                ) : (
                    <RuleEngineTable rules={rules} />
                )}
            </div>
        </div>
    );
}
