import React, { useState } from 'react';
import { User, Lock, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import userAvatar from '../assets/user.png';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 transition-colors duration-500 font-sans">
            <div className="card w-full max-w-lg bg-base-100 shadow-2xl relative overflow-visible animate-fade-in animate-zoom-in">

                <div className="card-body items-center text-center p-8 sm:p-12">
                    <h2 className="card-title text-3xl font-bold tracking-tight mb-2">Welcome Back</h2>

                    {/* User Profile Image */}
                    <div className="avatar mt-4 mb-2">
                        <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-inner hover:scale-105 transition-transform duration-300">
                            <img src={userAvatar} alt="User Profile" />
                        </div>
                    </div>

                    {/* Role Selector - Moved Inside */}
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

                    {/* Inputs with Icons - Maximized Width */}
                    <div className="form-control w-full space-y-5">
                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Username</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300 bg-base-50/30">
                                <User size={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
                                <input type="text" className="grow text-base" placeholder="Enter your username" />
                            </label>
                        </div>

                        <div className="relative group text-left w-full">
                            <label className="label">
                                <span className="label-text font-semibold opacity-70">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-3 rounded-2xl h-14 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300 bg-base-50/30">
                                <Lock size={20} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="grow text-base"
                                    placeholder="••••••••"
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

                    {/* Signup Link */}
                    <p className="text-sm mt-8 opacity-80">
                        Don't have an account? <Link to="/signup" className="text-primary font-bold cursor-pointer hover:underline decoration-2 underline-offset-4 transition-all">Signup</Link>
                    </p>

                    {/* Login Button */}
                    <div className="card-actions w-full mt-8">
                        <button className="btn btn-neutral btn-block h-14 rounded-2xl shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all text-lg font-bold">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

