import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { InputField } from './InputField';
import { Button } from '../ui/Button';
import { authService } from '../../api/authService';
import { useAuth } from '../../context/AuthContext';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

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

            // Use the login function from AuthContext to update state globally
            login(data);

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
                {/* {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl mb-4">
                        {error}
                    </div>
                )} */}

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
                    <a href="#" className="text-sm font-bold text-[#5e6f5e] hover:text-[#4a3420] transition-colors">
                        Forgot Password?
                    </a>
                </div>

                <Button
                    type="submit"
                    className="w-full h-14 text-lg tracking-wide font-semibold bg-[#5e6f5e] hover:bg-[#4D5B4D] text-white rounded-2xl shadow-md transition-all active:scale-[0.98]"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    );
}
