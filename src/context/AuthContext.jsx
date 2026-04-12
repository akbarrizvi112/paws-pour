import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize from localStorage
        const token = localStorage.getItem('accessToken');

        if (token) {
            const userData = {
                id: localStorage.getItem('userId'),
                name: localStorage.getItem('userName'),
                email: localStorage.getItem('userEmail'),
            };
            setUser(userData);
        }
        setLoading(false);
    }, []);

    const login = (inputData) => {
        if (!inputData) return;

        // Handle nested data property if it exists
        const data = inputData.data || inputData;

        const token = data.accessToken || data.token;
        if (token) {
            localStorage.setItem('accessToken', token);
        }

        const userId = data.userId || data.id || data._id;
        const userName = data.name || data.userName || data.username;
        const userEmail = data.email;
        const userRole = data.role || data.roles || data.type;

        if (userId) localStorage.setItem('userId', userId);
        if (userName) localStorage.setItem('userName', userName);
        if (userEmail) localStorage.setItem('userEmail', userEmail);
        if (userRole) {
            localStorage.setItem('userRole', Array.isArray(userRole) ? userRole.join(',') : userRole);
        }

        if (token || userId) {
            setUser({
                id: userId,
                name: userName,
                email: userEmail,
                role: userRole
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
