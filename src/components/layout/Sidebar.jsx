import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { LayoutDashboard, PawPrint, Bone, ShieldCheck, CreditCard, Activity, Settings, LogOut } from 'lucide-react';
import { authService } from '../../api/authService';

const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Pet Profiles', path: '/pets', icon: PawPrint },
    { name: 'Treat Database', path: '/treats', icon: Bone },
    { name: 'Rule Engine', path: '/rules', icon: ShieldCheck },
    { name: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
    { name: 'Safety Logs', path: '/safety', icon: Activity },
    { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-background border-r border-primary-100 flex flex-col pt-6">
            <div className="flex items-center gap-3 px-6 mb-8">
                <PawPrint className="w-8 h-8 text-accent" />
                <span className="text-xl font-bold text-primary-900 tracking-tight">Paws & Pour</span>
            </div>
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary-100 text-primary-900'
                                        : 'text-primary-600 hover:bg-primary-50 hover:text-primary-900'
                                )
                            }
                        >
                            <Icon className="w-5 h-5" />
                            {item.name}
                        </NavLink>
                    );
                })}

                <button
                    onClick={handleLogout}
                    className="w-full mt-4 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </nav>
        </aside>
    );
}
