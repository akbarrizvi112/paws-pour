import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { userService } from '../../api/userService';

export function ActivityChart() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const data = await userService.getRuleEngineActivity();
                setChartData(data);
            } catch (error) {
                console.error("Failed to fetch activity chart data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, []);

    if (loading) {
        return (
            <Card className="col-span-1 lg:col-span-2 shadow-sm h-[400px] flex items-center justify-center">
                <div className="animate-pulse bg-gray-100 w-full h-full rounded-xl"></div>
            </Card>
        );
    }

    return (
        <Card className="col-span-1 lg:col-span-2 shadow-sm">
            <CardHeader>
                <CardTitle>Rule Engine Activity</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Explicitly sized container to prevent Recharts -1 width/height warning */}
                <div style={{ width: '100%', height: 300, minHeight: 300, position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaf1ea" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9e734c' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9e734c' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: '1px solid #f4ede4', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                            <Line type="monotone" dataKey="allergyBlocks" name="Allergy Blocks" stroke="#5e6f5e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="toxicBlocks" name="Toxic Ingredient Blocks" stroke="#b58d62" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="portionAdjustments" name="Portion Adjustments" stroke="#d97757" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
