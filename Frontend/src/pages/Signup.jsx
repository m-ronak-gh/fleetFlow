import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Cubes from '../components/Cubes';

const Signup = () => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSignup(e) {
        e.preventDefault();
        const { fullName, email, role, password, confirmPassword } = form;

        if (!fullName || !email || !role || !password) return toast.error('Please fill in all fields');
        if (password !== confirmPassword) return toast.error('Passwords do not match');
        if (password.length < 6) return toast.error('Password must be at least 6 characters');

        setLoading(true);
        try {
            await signup(email, password, { full_name: fullName, role });
            toast.success('Account created! Check your email to confirm.');
            navigate('/login');
        } catch (err) {
            toast.error(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 transition-colors duration-500 font-sans relative overflow-hidden">

            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <Cubes
                    gridSize={8}
                    maxAngle={45}
                    radius={3}
                    borderStyle="2px dashed #B19EEF"
                    faceColor="#1a1a2e"
                    rippleColor="#ff6b6b"
                    rippleSpeed={1.5}
                    autoAnimate
                    rippleOnClick
                />
            </div>

            <div className="card w-full max-w-lg bg-base-100/90 backdrop-blur-md shadow-2xl relative z-10 overflow-visible border border-base-content/5">
                <form className="card-body items-center text-center p-8 sm:p-12" onSubmit={handleSignup}>
                    <h2 className="card-title text-3xl font-bold tracking-tight mb-8">Create Account</h2>

                    <div className="form-control w-full gap-5">
                        {/* Full Name */}
                        <div className="text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Full Name</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
                                <User size={20} className="opacity-40" />
                                <input
                                    type="text"
                                    name="fullName"
                                    className="grow text-base"
                                    placeholder="Enter your full name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Email */}
                        <div className="text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Email</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
                                <Mail size={20} className="opacity-40" />
                                <input
                                    type="email"
                                    name="email"
                                    className="grow text-base"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Role */}
                        <div className="text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Role</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    className="select select-bordered w-full rounded-2xl h-14 text-base focus:ring-2 focus:ring-primary/20 appearance-none px-4"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Role</option>
                                    <option value="Fleet Manager">Fleet Manager</option>
                                    <option value="Dispatcher">Dispatcher</option>
                                </select>
                                <div className="absolute right-6 top-4 pointer-events-none opacity-40">
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
                                <Lock size={20} className="opacity-40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="grow text-base"
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-ghost btn-circle btn-sm opacity-40 hover:opacity-100 transition-opacity">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </label>
                        </div>

                        {/* Confirm Password */}
                        <div className="text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Confirm Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
                                <ShieldCheck size={20} className="opacity-40" />
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    name="confirmPassword"
                                    className="grow text-base"
                                    placeholder="Confirm password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                    className="btn btn-ghost btn-circle btn-sm opacity-40 hover:opacity-100 transition-opacity">
                                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </label>
                        </div>
                    </div>

                    <p className="text-sm mt-8 opacity-80">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all">
                            Login
                        </Link>
                    </p>

                    <div className="card-actions w-full mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-neutral btn-block h-14 rounded-2xl shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all text-lg font-bold"
                        >
                            {loading ? <span className="loading loading-spinner" /> : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
