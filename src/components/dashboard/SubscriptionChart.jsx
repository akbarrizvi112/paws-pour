import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export function SubscriptionChart({ data }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Subscription Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaf1ea" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9e734c' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9e734c' }} />
                            <Tooltip
                                cursor={{ fill: '#fdfaf6' }}
                                contentStyle={{ borderRadius: '12px', border: '1px solid #f4ede4', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="trial" name="Trial Users" fill="#b58d62" radius={[4, 4, 0, 0]} barSize={24} />
                            <Bar dataKey="active" name="Active Subscriptions" fill="#6b8c6a" radius={[4, 4, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
