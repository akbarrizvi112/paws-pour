import { Bell, Search, UserCircle, LogOut } from 'lucide-react';

export function Navbar({ userName = "User" }) {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-surface border-b border-primary-100">
            <div className="flex items-center bg-primary-50 px-3 py-2 rounded-lg border border-primary-100 w-96">
                <Search className="w-4 h-4 text-primary-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm w-full text-primary-900 placeholder:text-primary-500"
                />
            </div>
            <div className="flex items-center gap-6">
                <button className="relative text-primary-600 hover:text-primary-900 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full"></span>
                </button>
                <div className="h-6 w-px bg-primary-100"></div>
                <div className="flex items-center gap-3">
                    <UserCircle className="w-8 h-8 text-primary-500" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-primary-900">{userName}</span>
                        <span className="text-xs text-primary-600">Admin</span>
                    </div>
                </div>
                <button className="text-primary-600 hover:text-danger transition-colors flex items-center gap-1 text-sm font-medium ml-2">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
}
