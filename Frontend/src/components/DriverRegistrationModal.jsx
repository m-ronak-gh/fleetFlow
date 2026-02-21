import React, { useState } from 'react';
import { X, User, Hash, Calendar, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const DriverRegistrationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        license_number: '',
        license_expiry: '',
        status: 'On Duty'
    });

    if (!isOpen) return null;

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4242/api/drivers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to register driver');
            }

            toast.success('Operator Credentials Verified');
            onClose();
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#060010]/60 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(177,158,239,0.15)] overflow-hidden animate-in zoom-in-95 fade-in duration-500">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />

                <form className="relative p-10 sm:p-12 space-y-8" onSubmit={handleRegister}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="font-black text-2xl text-white italic tracking-tighter uppercase leading-none">Operator Registry</h3>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all active:scale-90"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="text-left">
                            <label className="label py-1">
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Full Legal Name</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                <User size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                <input
                                    type="text"
                                    className="grow text-white font-bold placeholder:text-white/10"
                                    placeholder="John Doe"
                                    required
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                />
                            </label>
                        </div>

                        <div className="text-left">
                            <label className="label py-1">
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">License Number</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                <Hash size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                <input
                                    type="text"
                                    className="grow text-white font-bold placeholder:text-white/10 uppercase"
                                    placeholder="DL-892345"
                                    required
                                    value={formData.license_number}
                                    onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                                />
                            </label>
                        </div>

                        <div className="text-left">
                            <label className="label py-1">
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">License Expiry Date</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                <Calendar size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                <input
                                    type="date"
                                    className="grow text-white font-bold [color-scheme:dark]"
                                    required
                                    value={formData.license_expiry}
                                    onChange={(e) => setFormData({ ...formData, license_expiry: e.target.value })}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="btn btn-primary btn-block h-16 rounded-[1.8rem] shadow-xl shadow-primary/20 border-none font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Validate & Sign Operator
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DriverRegistrationModal;
