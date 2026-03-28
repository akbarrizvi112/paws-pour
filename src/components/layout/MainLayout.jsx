import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '../../utils/helpers';

export function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

    return (
        <div className="min-h-screen bg-background flex overflow-x-hidden relative">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />
            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-300 w-full",
                "lg:ml-64",
                isCollapsed && "lg:ml-20",
                "ml-0"
            )}>
                <Navbar onMenuClick={toggleMobileSidebar} />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
