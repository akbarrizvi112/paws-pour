import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export function CalorieOverview() {
    // SVG Donut chart calculation
    const size = 220;
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // Values
    const dailyCalories = 960;
    const totalCalories = 1420;

    // Percentages
    // Visual match: about 75% green, 15% beige, 10% empty
    const greenPercent = 0.75;
    const beigePercent = 0.15;

    const greenDasharray = `${circumference * greenPercent} ${circumference}`;
    const beigeDasharray = `${circumference * beigePercent} ${circumference}`;
    const beigeDashoffset = -circumference * greenPercent;

    return (
        <Card className="bg-[#fcfaf7] border-none shadow-sm relative overflow-hidden h-full">

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
                            <span className="text-4xl font-semibold text-[#4a4a4a]">960</span>
                            <span className="text-lg text-[#6b6b6b]">kcal</span>
                        </div>
                        <span className="text-xl text-[#6b6b6b] mt-0 mb-2">Used</span>
                        <div className="w-32 h-px bg-[#e0dcd3] my-1"></div>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-2xl font-medium text-[#4a4a4a]">1,420</span>
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
                        <span className="text-xl font-medium">960</span>
                    </div>
                    <div className="w-full h-px bg-[#e0dcd3]"></div>
                    <div className="flex justify-between items-center text-[#4a4a4a]">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-[#e8c99b]"></div>
                            <span className="text-lg font-medium">Treat Allowance</span>
                        </div>
                        <span className="text-xl font-medium">1,420</span>
                    </div>
                </div>


                <div className="w-full text-center mt-2">
                    <p className="text-[13px] text-[#8c8c8c]">
                        Max Allowance is capped at 63 kcal. (10%)
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
