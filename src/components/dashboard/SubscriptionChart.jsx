import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../ui/Card';

export function SubscriptionChart({ data }) {
    // We are ignoring the 'data' prop to hardcode the look from the image,
    // or we could use it and just render the layout. I'll use a mix: 
    // the layout from the image exactly, with some mock data for the bars 
    // to match the varying heights and colors seen in the mockup.

    const mockData = [
        { name: '1', green: 0, beige: 10 },
        { name: '2', green: 0, beige: 15 },
        { name: '3', green: 0, beige: 20 },
        { name: '4', green: 25, beige: 20 },
        { name: '5', green: 40, beige: 0 },
        { name: '6', green: 0, beige: 60 },
        { name: '7', green: 30, beige: 0 },
        { name: '8', green: 35, beige: 35 },
    ];

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
                    <span className="text-3xl font-medium text-[#5a544b] mb-1">1,235</span>
                    <span className="text-[15px] leading-tight text-[#6e685f]">
                        Active<br />Subscriptions
                    </span>
                </div>

                <div className="w-px h-16 bg-[#ebe6df]"></div>

                <div className="flex-1 flex flex-col items-center">
                    <span className="text-3xl font-medium text-[#5a544b] mb-1">280</span>
                    <span className="text-[15px] leading-tight text-[#6e685f]">
                        Inactive<br />Subscriptions
                    </span>
                </div>
            </div>

            <div className="w-full h-px bg-[#ebe6df] mb-6"></div>

            {/* Chart Area */}
            <div className="w-full h-[160px] relative px-2 mt-4 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} barCategoryGap="25%">
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4decb" />
                        <XAxis dataKey="name" hide={true} />
                        <YAxis hide={true} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '12px', border: '1px solid #ebe6df', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar stackId="a" dataKey="green" fill="#a4ab89" radius={[4, 4, 0, 0]} />
                        <Bar stackId="a" dataKey="beige" fill="#dabd9e" radius={[4, 4, 0, 0]} />
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
