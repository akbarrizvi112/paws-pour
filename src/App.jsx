import { createContext, useContext, useState, useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { PetProfiles } from './pages/PetProfiles';
import { TreatDatabase } from './pages/TreatDatabase';
import { RuleEngine } from './pages/RuleEngine';
import { Subscriptions } from './pages/Subscriptions';
import { SafetyLogs } from './pages/SafetyLogs';
import { Login } from './pages/Login';
import { Users } from './pages/Users';
import { Ingredients } from './pages/Ingredients';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-red-50 text-red-800">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <pre className="p-4 bg-white border border-red-200 rounded max-w-full overflow-auto text-xs">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Auth Route */}
              <Route path="/login" element={<Login />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="pets" element={<PetProfiles />} />
                <Route path="treats" element={<TreatDatabase />} />
                <Route path="rules" element={<RuleEngine />} />
                <Route path="nutrition" element={<Ingredients />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="safety" element={<SafetyLogs />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={
                  <div className="flex items-center justify-center p-12 bg-surface rounded-xl border border-primary-100 h-full">
                    <h2 className="text-2xl font-bold text-primary-600">Settings Page (Placeholder)</h2>
                  </div>
                } />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
