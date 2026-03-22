import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { InputField } from './InputField';
import { Button } from '../ui/Button';
import { authService } from '../../api/authService';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const data = await authService.login(email, password);
            if (data.accessToken) localStorage.setItem('accessToken', data.accessToken);
            if (data.userId) localStorage.setItem('userId', data.userId);
            if (data.name) localStorage.setItem('userName', data.name);
            if (data.email) localStorage.setItem('userEmail', data.email);

            navigate('/');
        } catch (err) {
            setError(err.message || 'Invalid credentials. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <form onSubmit={handleLogin} className="space-y-5">
                {/* {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg font-medium animate-in fade-in slide-in-from-top-1">{error}</div>} */}

                <InputField
                    icon={User}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <InputField
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    rightIcon={
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none flex items-center justify-center h-full w-full">
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    }
                />

                <div className="flex justify-end pt-1 pb-4">
                    <a href="#" className="text-sm font-bold text-[#6b8c6a] hover:text-[#4a3420] transition-colors">
                        Forgot Password?
                    </a>
                </div>

                <Button
                    type="submit"
                    className="w-full h-14 text-lg tracking-wide font-semibold bg-[#6b8c6a] hover:bg-[#5a7659] text-white rounded-2xl shadow-md transition-all active:scale-[0.98]"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    );
}
