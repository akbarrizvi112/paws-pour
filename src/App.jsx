import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { PetProfiles } from './pages/PetProfiles';
import { TreatDatabase } from './pages/TreatDatabase';
import { RuleEngine } from './pages/RuleEngine';
import { Subscriptions } from './pages/Subscriptions';
import { SafetyLogs } from './pages/SafetyLogs';
import { Login } from './pages/Login';


function ProtectedRoute({ children }) {

  const isAuthenticated = !!localStorage.getItem('accessToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pets" element={<PetProfiles />} />
          <Route path="treats" element={<TreatDatabase />} />
          <Route path="rules" element={<RuleEngine />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="safety" element={<SafetyLogs />} />
          <Route path="settings" element={
            <div className="flex items-center justify-center p-12 bg-surface rounded-xl border border-primary-100 h-full">
              <h2 className="text-2xl font-bold text-primary-600">Settings Page (Placeholder)</h2>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
