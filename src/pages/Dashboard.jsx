import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { RuleTransparency } from '../components/dashboard/RuleTransparency';
import { PetProfilesTable } from '../components/tables/PetProfilesTable';
import { TreatDatabaseTable } from '../components/tables/TreatDatabaseTable';
import { RuleEngineTable } from '../components/tables/RuleEngineTable';
import { SubscriptionChart } from '../components/dashboard/SubscriptionChart';
import { CalorieOverview } from '../components/dashboard/CalorieOverview';
import { SafetyLogsTable } from '../components/tables/SafetyLogsTable';
import { TreatModal } from '../components/modals/TreatModal';
import { PetModal } from '../components/modals/PetModal';
import { Button } from '../components/ui/Button';
import { PawPrint, Bone, ShieldAlert, CreditCard } from 'lucide-react';

import { usePets } from '../hooks/usePets';
import { useTreats } from '../hooks/useTreats';
import { treatService } from '../services/treatService';
import { petService } from '../services/petService';
import { useRules } from '../hooks/useRules';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { useSafetyLogs } from '../hooks/useSafetyLogs';
import { userService } from '../api/userService';


export function Dashboard() {
    const navigate = useNavigate();
    const {
        pets,
        loading: petsLoading,
        refetch: refetchPets
    } = usePets();
    const {
        treats,
        setTreats,
        loading: treatsLoading,
        refetch: refetchTreats
    } = useTreats();
    const {
        rules: legacyRules,
        unifiedRules,
        loading: rulesLoading
    } = useRules();

    // Combine for dashboard preview
    const allRules = [...(unifiedRules || []), ...(legacyRules || [])];
    const { stats: subsStats, loading: subsLoading } = useSubscriptions();
    const { logs: safetyLogs, loading: safetyLoading } = useSafetyLogs();
    const [dashboardStats, setDashboardStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);

    // Treat Modal State
    const [treatModalOpen, setTreatModalOpen] = useState(false);
    const [editingTreat, setEditingTreat] = useState(null);

    // Pet Modal State
    const [petModalOpen, setPetModalOpen] = useState(false);
    const [editingPet, setEditingPet] = useState(null);

    const handleOpenAddPet = () => {
        setEditingPet(null);
        setPetModalOpen(true);
    };

    const handleEditPet = (pet) => {
        setEditingPet(pet);
        setPetModalOpen(true);
    };

    const handleDeletePet = async (pet) => {
        // FIX: Prioritize petId as specified by user
        const petId = pet?.petId || pet?.petID || pet?.id || pet?._id || pet;
        if (!petId || (typeof petId !== 'string' && typeof petId !== 'number')) {
            console.error("Cannot delete pet: Missing ID");
            return;
        }

        if (!window.confirm('Are you sure you want to delete this pet profile?')) return;
        try {
            await petService.deletePet(petId);
            refetchPets();
        } catch (error) {
            console.error("Failed to delete pet:", error);
            alert("Failed to delete pet: " + (error.response?.data?.message || error.message || "Unknown error"));
        }
    };

    const handlePetSubmit = async (data) => {
        // No try-catch here as it's handled in PetModal
        if (editingPet) {
            // FIX: Prioritize petId as specified by user
            const petId = data?.petId || data?.petID || data?.id || data?._id ||
                editingPet?.petId || editingPet?.petID || editingPet?.id || editingPet?._id;
            await petService.updatePet(petId, data);
        } else {
            await petService.createPet(data);
        }
        refetchPets();
    };

    const handleOpenAddTreat = () => {
        setEditingTreat(null);
        setTreatModalOpen(true);
    };

    const handleEditTreat = (treat) => {
        setEditingTreat(treat);
        setTreatModalOpen(true);
    };

    const handleDeleteTreat = async (treat) => {
        // FIX: Prioritize treatId as specified by user
        const id = treat?.treatId || treat?.treatID || treat?.id || treat?._id || treat;
        if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
            console.error("Cannot delete treat: Missing ID");
            return;
        }

        if (!window.confirm('Are you sure you want to delete this treat?')) return;
        try {
            await treatService.deleteTreat(id);
            // FIX: Robust state update filter
            setTreats(prev => prev.filter(t => (t.treatId || t.treatID || t.id || t._id) !== id));
            refetchTreats();
        } catch (error) {
            console.error("Failed to delete treat:", error);
            alert("Failed to delete treat: " + (error.response?.data?.message || error.message || "Unknown error"));
        }
    };

    const handleTreatSubmit = async (data) => {
        // FIX: Ultra-robust treatId resolution. Check modal data AND editingTreat state.
        // Check all common field names: treatId, treatID, treat_id, id, _id
        const treatId = data?.treatId || data?.treatID || data?.treat_id || data?.id || data?._id ||
            editingTreat?.treatId || editingTreat?.treatID || editingTreat?.treat_id || editingTreat?.id || editingTreat?._id;

        if (editingTreat) {
            if (!treatId) {
                console.error("Critical: Treat ID resolved to null/undefined", { data, editingTreat });
                alert("Operation failed: Could not resolve Treat ID. Please refresh and try again.");
                return;
            }
            console.log("Updating treat with resolved ID:", treatId);
            await treatService.updateTreat(treatId, data);
        } else {
            console.log("Creating new treat");
            await treatService.createTreat(data);
        }
        refetchTreats();
    };

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const data = await userService.getDashboardStats();
                setDashboardStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchDashboardStats();
    }, []);

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
                                className={activeTab === tab ? "bg-primary text-white font-bold whitespace-nowrap" : "text-primary-600 whitespace-nowrap"}
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
                    value={statsLoading ? "..." : (dashboardStats?.totalPets?.toLocaleString() || "0")}
                    subtitle="Pets"
                    icon={PawPrint}
                    colorClass="bg-success-soft text-primary"
                />
                <StatCard
                    title="Treats Approved"
                    value={statsLoading ? "..." : (dashboardStats?.totalTreatsApproved?.toLocaleString() || "0")}
                    subtitle="Treat Items"
                    icon={Bone}
                    colorClass="bg-primary-100 text-primary-600"
                />
                <StatCard
                    title="Allergy Blocks Triggered"
                    value={statsLoading ? "..." : (dashboardStats?.allergyBlocks?.toLocaleString() || "0")}
                    subtitle="Safety Blocks"
                    icon={ShieldAlert}
                    colorClass="bg-warning-soft text-warning"
                />
                <StatCard
                    title="Active Subs"
                    value={statsLoading ? "..." : (dashboardStats?.activeSubscriptions?.toLocaleString() || "0")}
                    icon={CreditCard}
                    colorClass="bg-success-soft text-primary"
                />
            </div>

            {/* Dynamic Content Area */}
            {activeTab === 'Dashboard' && (
                <>
                    {/* Charts & Rules Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ActivityChart />
                        <div className="lg:col-span-1">
                            <RuleTransparency />
                        </div>
                    </div>

                    {/* Tables Row 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-primary-900">Recent Pet Profiles</h2>
                                <Button
                                    variant="ghost"
                                    className="text-primary-600"
                                    onClick={() => navigate('/pets')}
                                >
                                    View All &gt;
                                </Button>
                            </div>
                            {petsLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                <PetProfilesTable
                                    pets={Array.isArray(pets) ? pets.slice(0, 5) : []}
                                    onEdit={handleEditPet}
                                    onDelete={handleDeletePet}
                                    onNutrition={(pet) => navigate('/pets')}
                                />
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-primary-900">Rule Engine Control</h2>
                                <Button
                                    variant="ghost"
                                    className="text-primary-600"
                                    onClick={() => navigate('/rules')}
                                >
                                    View All &gt;
                                </Button>
                            </div>
                            {rulesLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                <RuleEngineTable
                                    rules={allRules.slice(0, 4)}
                                    isUnified={allRules.some(r => !!r.source)}
                                />
                            )}
                        </div>
                    </div>

                    {/* Tables Row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-primary-900">Treat Database Management</h2>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="bg-primary hover:bg-primary-600 text-white"
                                        onClick={handleOpenAddTreat}
                                    >
                                        Add Treat
                                    </Button>
                                    {/* FIX: Removed disabled button */}
                                    <Button size="sm" variant="outline" onClick={() => alert('Please use the edit icon in the table rows.')}>Edit</Button>
                                </div>
                            </div>
                            {treatsLoading ? <div className="h-[400px] bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                <TreatDatabaseTable
                                    treats={treats.slice(0, 5)}
                                    currentPage={1}
                                    totalPages={8}
                                    onPageChange={() => { }}
                                    onEdit={handleEditTreat}
                                    onDelete={handleDeleteTreat}
                                />
                            )}

                        </div>

                        <div className="space-y-8">
                            <div className="h-auto">
                                <CalorieOverview />
                            </div>

                            <div className="h-auto">
                                <SubscriptionChart />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-primary-900">Safety Logs</h2>
                                    <Button
                                        variant="ghost"
                                        className="text-primary-600"
                                        onClick={() => navigate('/safety')}
                                    >
                                        View All &gt;
                                    </Button>
                                </div>
                                {safetyLoading ? <div className="h-48 bg-surface rounded-2xl border border-primary-100 animate-pulse" /> : (
                                    <SafetyLogsTable logs={Array.isArray(safetyLogs) ? safetyLogs.slice(0, 5) : []} currentPage={1} totalPages={1} onPageChange={() => { }} />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'Pet Profiles' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-primary-900">Pet Profiles</h2>
                        <Button
                            size="sm"
                            className="bg-primary hover:bg-primary-600 text-white"
                            onClick={handleOpenAddPet}
                        >
                            Add Pet Profile
                        </Button>
                    </div>
                    {petsLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                        <PetProfilesTable
                            pets={pets}
                            currentPage={1}
                            totalPages={5}
                            onPageChange={() => { }}
                            onEdit={handleEditPet}
                            onDelete={handleDeletePet}
                            onNutrition={(pet) => navigate('/pets')}
                        />
                    )}

                </div>
            )}

            {activeTab === 'Treat Database' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-primary-900">Treat Database</h2>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                className="bg-primary hover:bg-primary-600 text-white"
                                onClick={handleOpenAddTreat}
                            >
                                Add Treat
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => alert('Please use the edit icon in the table rows.')}>Edit</Button>

                        </div>
                    </div>
                    {treatsLoading ? <div className="h-[400px] bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                        <TreatDatabaseTable
                            treats={treats}
                            currentPage={1}
                            totalPages={8}
                            onPageChange={() => { }}
                            onEdit={handleEditTreat}
                            onDelete={handleDeleteTreat}
                        />
                    )}
                </div>
            )}


            {activeTab === 'Rule Engine' && (
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-primary-900">Rule Engine Configuration</h2>
                        <div className="flex flex-wrap gap-2">
                            <Button className="bg-primary text-white hover:bg-primary-600 shadow-sm font-semibold">Species Compatibility</Button>
                            <Button className="bg-primary-100 text-primary-900 hover:bg-primary-200 shadow-sm font-semibold">Toxic Ingredients</Button>
                            <Button className="bg-warning-soft text-warning hover:bg-warning shadow-sm font-semibold">Allergy Filters</Button>
                        </div>
                    </div>
                    {rulesLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                        <RuleEngineTable
                            rules={allRules}
                            isUnified={allRules.some(r => !!r.source)}
                        />
                    )}
                </div>
            )}

            {activeTab === 'Analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-primary-900">Rule Engine Activity</h2>
                        <ActivityChart />
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <CalorieOverview />
                        </div>
                        <div className="space-y-4">
                            <div className="h-auto">
                                {subsLoading ? <div className="h-[300px] bg-surface rounded-2xl border border-primary-100 animate-pulse"></div> : (
                                    <SubscriptionChart data={subsStats} />
                                )}
                            </div>
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
                    {safetyLoading ? <div className="h-64 bg-surface rounded-2xl border border-primary-100 animate-pulse" /> : (
                        <SafetyLogsTable logs={safetyLogs} currentPage={1} totalPages={1} onPageChange={() => { }} />
                    )}
                </div>
            )}

            {activeTab === 'Settings' && (
                <div className="flex items-center justify-center p-12 bg-surface rounded-xl border border-primary-100">
                    <h2 className="text-2xl font-bold text-primary-600">Settings Page (Placeholder)</h2>
                </div>
            )}

            <TreatModal
                isOpen={treatModalOpen}
                onClose={() => setTreatModalOpen(false)}
                onSubmit={handleTreatSubmit}
                treat={editingTreat}
            />

            <PetModal
                isOpen={petModalOpen}
                onClose={() => setPetModalOpen(false)}
                onSubmit={handlePetSubmit}
                pet={editingPet}
            />


        </div>

    );
}
