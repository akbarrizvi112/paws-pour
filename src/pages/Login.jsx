import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';

export function Login() {
    return (
        <AuthLayout>
            <div className="mb-8 text-center lg:text-left hidden lg:block">
                <h2 className="text-2xl font-bold text-[#4a3420] tracking-tight">Sign In</h2>
                <p className="text-[#9e734c] mt-1 text-sm">Please enter your details to continue.</p>
            </div>
            <LoginForm />
        </AuthLayout>
    );
}
