import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 transition-colors duration-500 font-sans">
            <div className="card w-full max-w-lg bg-base-100 shadow-2xl relative overflow-visible animate-fade-in animate-zoom-in">
                <div className="card-body items-center text-center p-8 sm:p-12">
                    <h2 className="card-title text-3xl font-bold tracking-tight mb-8">Create Account</h2>

                    <div className="form-control w-full gap-5">
                        {/* 1. Full Name Input */}
                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Full Name</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300 bg-base-50/30 border-none">
                                <User size={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
                                <input type="text" className="grow text-base" placeholder="Enter your full name" />
                            </label>
                        </div>

                        {/* 2. Email ID Input */}
                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Email ID</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300 bg-base-50/30 border-none">
                                <Mail size={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
                                <input type="email" className="grow text-base" placeholder="Enter your email" />
                            </label>
                        </div>

                        {/* 3. Role Selector */}
                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Role</span>
                            </label>
                            <div className="relative">
                                <select className="select select-bordered w-full rounded-2xl bg-base-50/30 border-none h-14 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none px-4">
                                    <option disabled selected>Select Role</option>
                                    <option>Fleet Manager</option>
                                    <option>Dispatcher</option>
                                </select>
                                <div className="absolute right-6 top-4 pointer-events-none opacity-40 group-focus-within:opacity-100">
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                        </div>

                        {/* 4. Password Input */}
                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300 bg-base-50/30 border-none">
                                <Lock size={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="grow text-base"
                                    placeholder="Enter password"
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

                        {/* 5. Confirm Password Input */}
                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Confirm Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300 bg-base-50/30 border-none">
                                <ShieldCheck size={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="grow text-base"
                                    placeholder="Confirm password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="btn btn-ghost btn-circle btn-sm opacity-40 hover:opacity-100 transition-opacity"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </label>
                        </div>
                    </div>


                    {/* Link back to Login */}
                    <p className="text-sm mt-8 opacity-80">
                        Already have an account? <Link to="/login" className="text-primary font-bold cursor-pointer hover:underline decoration-2 underline-offset-4 transition-all">Login</Link>
                    </p>

                    {/* 6. Sign Up Button */}
                    <div className="card-actions w-full mt-8">
                        <button className="btn btn-neutral btn-block h-14 rounded-2xl shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all text-lg font-bold">
                            sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
