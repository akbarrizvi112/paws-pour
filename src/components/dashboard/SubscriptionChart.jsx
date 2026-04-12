import { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../ui/Card';
import { userService } from '../../api/userService';

export function SubscriptionChart({ data: initialData }) {
    const [chartData, setChartData] = useState([]);
    const [stats, setStats] = useState({ active: 0, inactive: 0 });
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        const hasData = initialData && (initialData.chartData || initialData.activeSubs !== undefined);
        if (hasData) {
            setChartData(initialData.chartData || []);
            setStats({ active: initialData.activeSubs || 0, inactive: initialData.inactiveSubs || 0 });
            setLoading(false);
            return;
        }

        const fetchSubscriptionData = async () => {
            try {
                const data = await userService.getSubscriptionChart();
                setChartData(data.chartData || []);
                setStats({ active: data.activeSubs || 0, inactive: data.inactiveSubs || 0 });
            } catch (error) {
                console.error("Failed to fetch subscription chart data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubscriptionData();
    }, [initialData]);

    if (loading) {
        return (
            <Card className="bg-[#fcfaf7] border-none shadow-sm h-full flex items-center justify-center p-6 rounded-3xl">
                <div className="animate-pulse flex flex-col items-center w-full">
                    <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-20 w-full bg-gray-100 rounded mb-4"></div>
                    <div className="h-32 w-full bg-gray-200 rounded"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="bg-[#fcfaf7] border-none shadow-sm relative h-full flex flex-col p-6 rounded-3xl">
            {/* Title */}
            <h2 className="text-[22px] text-[#464038] font-medium mb-4">
                Subscription Summary
            </h2>

            <div className="w-full h-px bg-[#ebe6df] mb-5"></div>

            {/* Stats Row */}
            <div className="flex items-center justify-between text-center px-2 mb-5">
                <div className="flex-1 flex flex-col items-center">
                    <span className="text-3xl font-medium text-[#5a544b] mb-1">{stats.active.toLocaleString()}</span>
                    <span className="text-[15px] leading-tight text-[#6e685f]">
                        Active<br />Subscriptions
                    </span>
                </div>

                <div className="w-px h-16 bg-[#ebe6df]"></div>

                <div className="flex-1 flex flex-col items-center">
                    <span className="text-3xl font-medium text-[#5a544b] mb-1">{stats.inactive.toLocaleString()}</span>
                    <span className="text-[15px] leading-tight text-[#6e685f]">
                        Inactive<br />Subscriptions
                    </span>
                </div>
            </div>

            <div className="w-full h-px bg-[#ebe6df] mb-6"></div>

            {/* Chart Area */}
            {/* Explicitly sized container to prevent Recharts -1 width/height warning */}
            <div style={{ width: '100%', height: 160, minHeight: 160, position: 'relative' }} className="px-2 mt-4 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} barCategoryGap="25%">
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4decb" />
                        <XAxis dataKey="date" hide={true} />
                        <YAxis hide={true} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '12px', border: '1px solid #ebe6df', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar stackId="a" dataKey="paid" fill="#a4ab89" radius={[4, 4, 0, 0]} />
                        <Bar stackId="a" dataKey="free" fill="#dabd9e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="text-center mt-3 mb-1">
                <span className="text-[15px] text-[#6e685f]">
                    Last 30 Days
                </span>
            </div>
        </Card>
    );
}
