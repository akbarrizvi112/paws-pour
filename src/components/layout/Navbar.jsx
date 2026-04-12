import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, UserCircle, LogOut, Menu } from 'lucide-react';
import { authService } from '../../api/authService';
import { userService } from '../../api/userService';

export function Navbar({ onMenuClick }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await userService.getProfile();
                setUser(profile);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const userName = user?.name || localStorage.getItem('userName') || "User";

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-4 bg-surface border-b border-primary-100">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-primary-600 hover:bg-primary-50 rounded-lg lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>


            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <button className="relative text-primary-600 hover:text-primary-900 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full"></span>
                </button>
                <div className="h-6 w-px bg-primary-100 hidden xs:block"></div>
                <div className="flex items-center gap-2 md:gap-3">
                    <UserCircle className="w-8 h-8 text-primary-500" />
                    <div className="hidden lg:flex flex-col">
                        <span className="text-sm font-semibold text-primary-900">{userName}</span>
                        <span className="text-xs text-primary-600">Admin</span>
                    </div>
                </div>
                <button
                    className="text-primary-600 hover:text-danger transition-colors flex items-center gap-1 text-sm font-medium ml-2"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    );
}
