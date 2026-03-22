import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { RuleTransparency } from '../components/dashboard/RuleTransparency';
import { PetProfilesTable } from '../components/tables/PetProfilesTable';
import { TreatDatabaseTable } from '../components/tables/TreatDatabaseTable';
import { RuleEngineTable } from '../components/tables/RuleEngineTable';
import { SubscriptionChart } from '../components/dashboard/SubscriptionChart';
import { SafetyLogsTable } from '../components/tables/SafetyLogsTable';
import { Button } from '../components/ui/Button';
import { PawPrint, Bone, ShieldAlert, CreditCard } from 'lucide-react';

import { usePets } from '../hooks/usePets';
import { useTreats } from '../hooks/useTreats';
import { useRules } from '../hooks/useRules';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { activityChartData, safetyLogsMock } from '../data/rulesMock';

export function Dashboard() {
    const { pets, loading: petsLoading } = usePets();
    const { treats, loading: treatsLoading } = useTreats();
    const { rules, loading: rulesLoading } = useRules();
    const { stats, loading: subsLoading } = useSubscriptions();

    const [activeTab, setActiveTab] = useState('Dashboard');
    const tabs = ['Dashboard', 'Pet Profiles', 'Treat Database', 'Rule Engine', 'Analytics', 'Safety Logs', 'Settings'];

    return (
        <div className="space-y-8 pb-12">
            <PageHeader
                title={activeTab === 'Dashboard' ? 'Dashboard' : activeTab}
                action={
                    <div className="flex gap-2 bg-surface p-1 rounded-lg border border-primary-100 overflow-x-auto max-w-full">
                        {tabs.map(tab => (
                            <Button
                                key={tab}
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveTab(tab)}
                                className={activeTab === tab ? "bg-[#eaf1ea] text-primary-900 font-bold whitespace-nowrap" : "text-primary-600 whitespace-nowrap"}
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>
                }
            />

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Pets"
                    value="1,245"
                    subtitle="Pets"
                    icon={PawPrint}
                    colorClass="bg-[#eaf1ea] text-[#6b8c6a]"
                />
                <StatCard
                    title="Treats Approved"
                    value="320"
                    subtitle="Treat Items"
                    icon={Bone}
                    colorClass="bg-[#f4ede4] text-[#b58d62]"
                />
                <StatCard
                    title="Allergy Blocks Triggered"
                    value="84"
                    subtitle="Safety Blocks"
                    icon={ShieldAlert}
                    colorClass="bg-[#fdebdd] text-[#d97757]"
                />
                <StatCard
                    title="Active Subs"
                    value="240"
                    icon={CreditCard}
                    colorClass="bg-[#eaf1ea] text-[#6b8c6a]"
                />
            </div>

            {/* Dynamic Content Area */}
            {activeTab === 'Dashboard' && (
                <>
                    {/* Charts & Rules Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ActivityChart data={activityChartData} />
                        <div className="lg:col-span-1">
                            <RuleTransparency />
                        </div>
                    </div>

                    {/* Tables Row 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-primary-900">Recent Pet Profiles</h2>
                                <Button variant="ghost" className="text-primary-600">View All &gt;</Button>
                            </div>
                            {petsLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                <PetProfilesTable pets={pets.slice(0, 5)} currentPage={1} totalPages={5} onPageChange={() => { }} />
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-primary-900">Rule Engine Control</h2>
                                <Button variant="ghost" className="text-primary-600">View All &gt;</Button>
                            </div>
                            {rulesLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                <RuleEngineTable rules={rules.slice(0, 4)} />
                            )}
                        </div>
                    </div>

                    {/* Tables Row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-primary-900">Treat Database Management</h2>
                                <div className="flex gap-2">
                                    <Button size="sm" className="bg-[#6b8c6a] hover:bg-[#5a7659] text-white">Add Treat</Button>
                                    <Button size="sm" variant="outline">Edit</Button>
                                    <Button size="sm" variant="outline">Disable</Button>
                                </div>
                            </div>
                            {treatsLoading ? <div className="h-[400px] bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                <TreatDatabaseTable treats={treats.slice(0, 5)} currentPage={1} totalPages={8} onPageChange={() => { }} />
                            )}
                        </div>

                        <div className="space-y-8">
                            <div className="h-[300px]">
                                {subsLoading ? <div className="h-full bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                    <SubscriptionChart data={stats} />
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-primary-900">Safety Logs</h2>
                                    <Button variant="ghost" className="text-primary-600">View All &gt;</Button>
                                </div>
                                <SafetyLogsTable logs={safetyLogsMock} currentPage={1} totalPages={8} onPageChange={() => { }} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'Pet Profiles' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-primary-900">Pet Profiles</h2>
                        <Button size="sm" className="bg-[#6b8c6a] hover:bg-[#5a7659] text-white">Add Pet Profile</Button>
                    </div>
                    {petsLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                        <PetProfilesTable pets={pets} currentPage={1} totalPages={5} onPageChange={() => { }} />
                    )}
                </div>
            )}

            {activeTab === 'Treat Database' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-primary-900">Treat Database</h2>
                        <div className="flex gap-2">
                            <Button size="sm" className="bg-[#6b8c6a] hover:bg-[#5a7659] text-white">Add Treat</Button>
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Disable</Button>
                        </div>
                    </div>
                    {treatsLoading ? <div className="h-[400px] bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                        <TreatDatabaseTable treats={treats} currentPage={1} totalPages={8} onPageChange={() => { }} />
                    )}
                </div>
            )}

            {activeTab === 'Rule Engine' && (
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-primary-900">Rule Engine Configuration</h2>
                        <div className="flex flex-wrap gap-2">
                            <Button className="bg-[#eaf1ea] text-[#4a3420] hover:bg-[#5a7659] hover:text-white shadow-sm font-semibold">Species Compatibility</Button>
                            <Button className="bg-[#f4ede4] text-[#4a3420] hover:bg-[#b05d41] hover:text-white shadow-sm font-semibold">Toxic Ingredients</Button>
                            <Button className="bg-[#fdebdd] text-[#4a3420] hover:bg-[#5a7659] hover:text-white shadow-sm font-semibold">Allergy Filters</Button>
                        </div>
                    </div>
                    {rulesLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                        <RuleEngineTable rules={rules} />
                    )}
                </div>
            )}

            {activeTab === 'Analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-primary-900">Rule Engine Activity</h2>
                        <ActivityChart data={activityChartData} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-primary-900">Subscription Monitoring</h2>
                        <div className="h-[300px]">
                            {subsLoading ? <div className="h-full bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                <SubscriptionChart data={stats} />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'Safety Logs' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-primary-900">Safety Logs</h2>
                        <Button variant="outline" className="text-primary-900 border-primary-500">Export Logs</Button>
                    </div>
                    <SafetyLogsTable logs={safetyLogsMock} currentPage={1} totalPages={8} onPageChange={() => { }} />
                </div>
            )}

            {activeTab === 'Settings' && (
                <div className="flex items-center justify-center p-12 bg-surface rounded-xl border border-primary-100">
                    <h2 className="text-2xl font-bold text-primary-600">Settings Page (Placeholder)</h2>
                </div>
            )}

        </div>
    );
}
