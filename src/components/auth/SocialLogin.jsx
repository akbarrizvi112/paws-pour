export function SocialLogin() {
    return (
        <div className="flex flex-col items-center gap-6 mt-8">
            <div className="flex items-center w-full">
                <div className="flex-1 h-[1px] bg-primary-100"></div>
                <span className="px-4 text-xs font-semibold text-primary-500 uppercase tracking-wider">- OR Continue with -</span>
                <div className="flex-1 h-[1px] bg-primary-100"></div>
            </div>

            <div className="flex gap-4">

                <button type="button" className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary-50 bg-surface shadow-sm hover:bg-primary-50 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                </button>

                <button type="button" className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary-50 bg-surface shadow-sm hover:bg-primary-50 transition-colors">
                    <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 49.7-.9 89.6-79.5 102.8-105.8-39-15.6-59.5-56-59.5-104.8zM260.6 70.4C275.5 50.7 286.9 25.8 284 0c-25 1-52.6 15.6-69.6 35.3-15.2 17.5-27.4 43.1-23.8 67 27.2 2.1 53.6-14.2 69.1-31.9z" />
                    </svg>
                </button>

                <button type="button" className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary-50 bg-surface shadow-sm hover:bg-primary-50 transition-colors">
                    <svg className="w-6 h-6 text-[#1877F2] fill-current" viewBox="0 0 320 512">
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                    </svg>
                </button>
            </div>

            <p className="text-sm font-medium text-primary-600 mt-2">
                Create an account? <a href="#" className="font-bold text-primary-900 hover:text-accent ml-1 underline underline-offset-2">Sign Up</a>
            </p>
        </div>
    );
}
