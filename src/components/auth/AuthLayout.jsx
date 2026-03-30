import logo from '../../assets/logo.png';

export function AuthLayout({ children }) {
    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#ebe6db]">
            <div className="flex-[0.8] flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden bg-[#ebe6db] lg:border-r border-[#d4cfc4]">
                <div className="z-10 text-center max-w-md flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-3 mb-8">
                        <img src={logo} alt="Paws & Pour Logo" className="w-72 h-32 object-contain" />
                        <p className="text-lg text-[#5e6f5e] font-medium hidden lg:block">
                            Every Pet Matters
                        </p>
                        {/* <span className="text-3xl font-serif font-extrabold text-[#4a3420] tracking-tight">Paws&Pour</span> */}
                    </div>
                    {/* <h1 className="text-4xl lg:text-6xl font-extrabold text-[#4a3420] tracking-tight mb-4">
                        Welcome<br />Back!
                    </h1> */}

                </div>
            </div>
            <div className="flex-[1.2] flex items-center justify-center p-6 lg:p-24 bg-[#ebe6db] lg:bg-[#fdfaf6]">
                <div className="w-full max-w-md bg-[#ebe6db] lg:bg-white lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[2rem] p-6 lg:p-12 border-none">
                    {children}
                </div>
            </div>
        </div>
    );
}
