import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { userService } from '../../api/userService';
import { useNavigate } from 'react-router-dom';

export function RuleTransparency() {
    const navigate = useNavigate();
    const [decisions, setDecisions] = useState({ safeApprovals: 0, allergyBlocks: 0, toxicBlocks: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDecisions = async () => {
            try {
                const data = await userService.getDecisionsToday();
                setDecisions(data);
            } catch (error) {
                console.error("Failed to fetch decisions today:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDecisions();
    }, []);

    if (loading) {
        return (
            <Card className="h-full flex flex-col items-center justify-center p-6">
                <div className="animate-pulse space-y-4 w-full">
                    <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-12 w-full bg-gray-100 rounded"></div>
                    <div className="h-12 w-full bg-gray-100 rounded"></div>
                    <div className="h-12 w-full bg-gray-100 rounded"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Rule Transparency</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                <p className="text-sm font-medium text-primary-600 mb-6">System Decisions Today</p>

                <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                        <div>
                            <span className="text-2xl font-bold text-primary-900 mr-2">{decisions.safeApprovals}</span>
                            <span className="text-sm font-medium text-primary-600">Safe Approvals</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <AlertTriangle className="w-6 h-6 text-[#d97757]" />
                        <div>
                            <span className="text-2xl font-bold text-primary-900 mr-2">{decisions.allergyBlocks}</span>
                            <span className="text-sm font-medium text-primary-600">Allergy Blocks</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <XCircle className="w-6 h-6 text-red-600" />
                        <div>
                            <span className="text-2xl font-bold text-primary-900 mr-2">{decisions.toxicBlocks}</span>
                            <span className="text-sm font-medium text-primary-600">Toxic Blocks</span>
                        </div>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full mt-6 py-6 text-base font-semibold"
                    onClick={() => navigate('/rules')}
                >
                    View Rules
                </Button>
            </CardContent>
        </Card>
    );
}
