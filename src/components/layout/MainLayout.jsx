import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function MainLayout() {
    return (
        <div className="min-h-screen bg-primary-50 flex">
            <Sidebar />
            <div className="ml-64 flex flex-col flex-1 min-h-screen overflow-hidden">
                <Navbar />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
