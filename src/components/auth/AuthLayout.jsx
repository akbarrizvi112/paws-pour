import { PawPrint } from 'lucide-react';

export function AuthLayout({ children }) {
    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#ebe6db]">
            {/* LEFT SECTION (Branding Area) */}
            <div className="flex-[0.8] flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden bg-[#ebe6db] lg:border-r border-[#d4cfc4]">
                <div className="z-10 text-center max-w-md flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-3 mb-8">
                        <PawPrint className="w-12 h-12 text-[#4a3420]" />
                        <span className="text-3xl font-serif font-extrabold text-[#4a3420] tracking-tight">Paws&Pour</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-[#4a3420] tracking-tight mb-4">
                        Welcome<br />Back!
                    </h1>
                    <p className="text-lg text-[#6b8c6a] font-medium hidden lg:block">
                        Smart pet care starts here.
                    </p>
                </div>
            </div>

            {/* RIGHT SECTION (Login Form container) */}
            <div className="flex-[1.2] flex items-center justify-center p-6 lg:p-24 bg-[#ebe6db] lg:bg-[#fdfaf6]">
                <div className="w-full max-w-md bg-[#ebe6db] lg:bg-white lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[2rem] p-6 lg:p-12 border-none">
                    {children}
                </div>
            </div>
        </div>
    );
}
