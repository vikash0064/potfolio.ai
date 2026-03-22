
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setError('');

        // --- ADMIN CREDENTIALS ---
        // Change these strings to whatever you want your ID and Password to be!
        const ADMIN_ID = "admin@example.com";
        const ADMIN_PASSWORD = "123";
        // -------------------------

        try {
            // Check if the typed email and password match our hardcoded ones
            if (email === ADMIN_ID && password === ADMIN_PASSWORD) {
                // Success: set the token so the router knows you are logged in
                localStorage.setItem('admin_token', 'authed');
                navigate('/admin');
            } else {
                setError('Invalid credentials. Please try again.');
                setIsPending(false);
                return;
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            setIsPending(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-4">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900 p-8 shadow-2xl border border-gray-800">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Admin Access
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Sign in to manage your portfolio
                    </p>
                    {/* Remove demo credentials for production */}
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        {error && (
                            <div className="rounded-md bg-red-900/50 border border-red-500 p-3 text-sm text-red-200">
                                {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input id="email-address" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="relative block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="relative block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={isPending} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isPending ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
