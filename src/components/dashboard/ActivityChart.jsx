import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export function ActivityChart({ data }) {
    return (
        <Card className="col-span-1 lg:col-span-2 shadow-sm">
            <CardHeader>
                <CardTitle>Rule Engine Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaf1ea" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9e734c' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9e734c' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: '1px solid #f4ede4', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                            <Line type="monotone" dataKey="allergyBlocks" name="Allergy Blocks" stroke="#6b8c6a" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="toxicBlocks" name="Toxic Ingredient Blocks" stroke="#b58d62" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="portionAdjustments" name="Portion Adjustments" stroke="#d97757" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
