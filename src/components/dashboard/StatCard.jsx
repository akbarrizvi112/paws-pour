import { Card, CardContent } from '../ui/Card';

export function StatCard({ title, value, subtitle, icon: Icon, colorClass }) {
    return (
        <Card>
            <CardContent className="p-6 flex items-center gap-5">
                <div className={`p-4 rounded-2xl ${colorClass}`}>
                    <Icon className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-primary-600 mb-1">{title}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold tracking-tight text-primary-900">{value}</span>
                        {subtitle && <span className="text-sm font-medium text-primary-600">{subtitle}</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
