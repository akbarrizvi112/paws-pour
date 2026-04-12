import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { LayoutDashboard, PawPrint, Bone, ShieldCheck, CreditCard, Activity, Settings, LogOut, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { authService } from '../../api/authService';
import logo from '../../assets/logo.png';

const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Pet Profiles', path: '/pets', icon: PawPrint },
    { name: 'Treat Database', path: '/treats', icon: Bone },
    { name: 'Rule Engine', path: '/rules', icon: ShieldCheck },
    { name: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
    { name: 'Safety Logs', path: '/safety', icon: Activity },
    { name: 'Users', path: '/users', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
    const navigate = useNavigate();
    return (
        <>

            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed top-0 left-0 z-50 h-screen bg-background border-r border-primary-100 flex flex-col pt-6 transition-all duration-300",

                "lg:w-64",
                isCollapsed && "lg:w-20",

                isMobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"
            )}>
                <div className={cn(
                    "flex items-center gap-3 px-6 mb-8 transition-all duration-300",
                    isCollapsed ? "lg:justify-center lg:px-0" : ""
                )}>
                    <img
                        src={logo}
                        alt="Paws & Pour Logo"
                        className={cn(
                            "shrink-0 object-contain transition-all duration-300",
                            isCollapsed ? "w-10 h-10" : "w-14 h-14"
                        )}
                    />
                    <span className={cn(
                        "text-xl font-bold text-primary-900 tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300",
                        isCollapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
                    )}>
                        Paws &amp; Pour
                    </span>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4 custom-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                title={isCollapsed ? item.name : ""}
                                onClick={() => setIsMobileOpen(false)}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center rounded-lg text-sm font-medium transition-all duration-200',
                                        isCollapsed ? 'lg:justify-center lg:p-2.5 px-3 py-2.5 gap-3' : 'gap-3 px-3 py-2.5',
                                        isActive
                                            ? 'bg-primary-100 text-primary-900'
                                            : 'text-primary-600 hover:bg-primary-50 hover:text-primary-900'
                                    )
                                }
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className={cn(
                                    "whitespace-nowrap overflow-hidden transition-all duration-300",
                                    isCollapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
                                )}>
                                    {item.name}
                                </span>
                            </NavLink>
                        );
                    })}

                </nav>

                <div className="p-4 border-t border-primary-100 hidden lg:block">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-center p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-900 transition-colors"
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>
            </aside>
        </>
    );
}
