import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { userService } from '../../api/userService';

export function CalorieOverview() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await userService.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch calorie stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // SVG Donut chart calculation
    const size = 220;
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // Use fetched values or fallbacks
    const dailyCalories = stats?.dailyCalories || 0;
    const totalCalories = stats?.totalCalories || 0;
    const maxAllowance = stats?.maxAllowance || 0;
    const usedPercent = totalCalories > 0 ? dailyCalories / totalCalories : 0;
    const treatPercent = stats?.treatAllowancePercent || 0.1; // Fallback to 10%

    // Percentages
    // Visual match: about 75% green, 15% beige, 10% empty
    const greenPercent = 0.75;
    const beigePercent = 0.15;

    const greenDasharray = `${circumference * (usedPercent || 0)} ${circumference}`;
    const beigeDasharray = `${circumference * treatPercent} ${circumference}`;
    const beigeDashoffset = -circumference * (usedPercent || 0);

    if (loading) {
        return (
            <Card className="bg-[#fcfaf7] border-none shadow-sm h-full flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="bg-[#fcfaf7] border-none shadow-sm relative overflow-hidden h-full">
            {/* Background decorative elements */}
            <div className="absolute top-12 left-4 w-3 h-2 bg-[#e8e4db] rounded-full opacity-60 transform -rotate-12"></div>
            <div className="absolute top-16 left-8 w-2 h-2 bg-[#e8e4db] rounded-full opacity-60"></div>
            <div className="absolute top-8 right-8 w-4 h-3 bg-[#e8e4db] rounded-full opacity-60 transform rotate-45"></div>
            <div className="absolute top-14 right-4 w-2 h-2 bg-[#e8e4db] rounded-full opacity-60"></div>
            <div className="absolute bottom-24 left-6 w-3 h-2 bg-[#e8e4db] rounded-full opacity-60 transform -rotate-45"></div>
            <div className="absolute bottom-20 left-2 w-2 h-2 bg-[#e8e4db] rounded-full opacity-60"></div>
            <div className="absolute bottom-32 right-6 w-5 h-4 bg-[#e8e4db] rounded-full opacity-60 transform rotate-12"></div>
            <div className="absolute bottom-24 right-10 w-2 h-2 bg-[#e8e4db] rounded-full opacity-60"></div>

            <CardHeader className="pb-0 pt-6 px-6">
                <CardTitle className="text-xl font-medium text-[#4a4a4a]">Calorie Overview</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4 flex flex-col items-center">

                <div className="relative flex justify-center items-center mb-6" style={{ width: size, height: size }}>
                    <svg
                        width={size}
                        height={size}
                        className="transform -rotate-90"
                    >
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke="#f3efe8"
                            strokeWidth={strokeWidth}
                        />
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke="#939d73"
                            strokeWidth={strokeWidth}
                            strokeDasharray={greenDasharray}
                            strokeLinecap="butt"
                        />
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke="#e8c99b"
                            strokeWidth={strokeWidth}
                            strokeDasharray={beigeDasharray}
                            strokeDashoffset={beigeDashoffset}
                            strokeLinecap="butt"
                        />
                    </svg>

                    <div className="absolute flex flex-col items-center justify-center text-center">
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-semibold text-[#4a4a4a]">{dailyCalories.toLocaleString()}</span>
                            <span className="text-lg text-[#6b6b6b]">kcal</span>
                        </div>
                        <span className="text-xl text-[#6b6b6b] mt-0 mb-2">Used</span>
                        <div className="w-32 h-px bg-[#e0dcd3] my-1"></div>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-2xl font-medium text-[#4a4a4a]">{totalCalories.toLocaleString()}</span>
                            <span className="text-lg text-[#6b6b6b]">kcal</span>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-4 mb-4">
                    <div className="flex justify-between items-center text-[#4a4a4a]">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-[#939d73]"></div>
                            <span className="text-lg font-medium">Daily Calories</span>
                        </div>
                        <span className="text-xl font-medium">{dailyCalories.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-px bg-[#e0dcd3]"></div>
                    <div className="flex justify-between items-center text-[#4a4a4a]">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-[#e8c99b]"></div>
                            <span className="text-lg font-medium">Treat Allowance</span>
                        </div>
                        <span className="text-xl font-medium">{totalCalories.toLocaleString()}</span>
                    </div>
                </div>

                <div className="w-full text-center mt-2">
                    <p className="text-[13px] text-[#8c8c8c]">
                        Max Allowance is capped at {maxAllowance} kcal. (10%)
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
