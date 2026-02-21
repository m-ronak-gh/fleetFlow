import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import userAvatar from '../assets/user.png';
import Cubes from '../components/Cubes';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        if (!email || !password) return toast.error('Please fill in all fields');

        setLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060010] px-4 transition-colors duration-500 font-sans relative overflow-hidden" data-theme="dark">

            {/* Background Animation - Smaller Cubes, Subtle Dark Theme */}
            <div className="absolute inset-0 z-0">
                <Cubes
                    gridSize={16}
                    maxAngle={30}
                    radius={2}
                    borderStyle="1px solid rgba(177, 158, 239, 0.05)"
                    faceColor="transparent"
                    rippleColor="#641ae6"
                    rippleSpeed={0.5}
                    autoAnimate
                    rippleOnClick
                />
            </div>

            <div className="card w-full max-w-lg bg-black/40 backdrop-blur-3xl shadow-2xl relative z-10 overflow-visible border border-white/5">

                <form className="card-body items-center text-center p-8 sm:p-12" onSubmit={handleLogin}>
                    <h2 className="card-title text-3xl font-black italic tracking-tighter mb-2 text-white">SYSTEM ACCESS</h2>
                    <p className="text-[10px] opacity-30 font-black uppercase tracking-[0.5em] mb-6">FleetFlow Synthetic Telemetry Link</p>

                    {/* Avatar */}
                    <div className="avatar mt-4 mb-2">
                        <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-inner hover:scale-105 transition-transform duration-300">
                            <img src={userAvatar} alt="User Profile" />
                        </div>
                    </div>

                    {/* Role selector (cosmetic only for now) */}
                    <div className="mb-8">
                        <div className="dropdown dropdown-center">
                            <div tabIndex={0} role="button" className="btn btn-sm rounded-full border-base-300 bg-base-100 hover:bg-base-200 transition-all shadow-sm px-6">
                                Role <ChevronDown size={14} className="opacity-50" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[2] menu p-2 shadow-xl bg-base-100 rounded-2xl w-40 mt-2 border border-base-200">
                                <li><a className="rounded-xl py-2">Manager</a></li>
                                <li><a className="rounded-xl py-2">Dispatcher</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="form-control w-full space-y-5">
                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Email</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
                                <User size={20} className="opacity-40" />
                                <input
                                    type="email"
                                    className="grow text-base"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
                                <Lock size={20} className="opacity-40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="grow text-base"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-ghost btn-circle btn-sm opacity-40 hover:opacity-100 transition-opacity"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </label>
                        </div>
                    </div>

                    <p className="text-sm mt-8 opacity-80">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all">
                            Sign up
                        </Link>
                    </p>

                    <div className="card-actions w-full mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-neutral btn-block h-14 rounded-2xl shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all text-lg font-bold"
                        >
                            {loading ? <span className="loading loading-spinner" /> : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
