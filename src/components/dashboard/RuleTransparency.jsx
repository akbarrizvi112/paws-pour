import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export function RuleTransparency() {
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
                            <span className="text-2xl font-bold text-primary-900 mr-2">210</span>
                            <span className="text-sm font-medium text-primary-600">Safe Approvals</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <AlertTriangle className="w-6 h-6 text-[#d97757]" />
                        <div>
                            <span className="text-2xl font-bold text-primary-900 mr-2">32</span>
                            <span className="text-sm font-medium text-primary-600">Allergy Blocks</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <XCircle className="w-6 h-6 text-red-600" />
                        <div>
                            <span className="text-2xl font-bold text-primary-900 mr-2">6</span>
                            <span className="text-sm font-medium text-primary-600">Toxic Blocks</span>
                        </div>
                    </div>
                </div>

                <Button variant="outline" className="w-full mt-6 py-6 text-base font-semibold">
                    View Rules
                </Button>
            </CardContent>
        </Card>
    );
}
