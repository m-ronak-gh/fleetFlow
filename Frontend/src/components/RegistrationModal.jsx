import React from 'react';
import { X, Truck, Hash, Gauge, Database, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';

const RegistrationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleRegister = (e) => {
        e.preventDefault();
        toast.success('Registration Protocol Initiated');
        onClose();
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
                                <Truck size={24} />
                            </div>
                            <h3 className="font-black text-2xl text-white italic tracking-tighter uppercase leading-none">Registration</h3>
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
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">License Plate</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                <Hash size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                <input type="text" className="grow text-white font-bold placeholder:text-white/10 uppercase" placeholder="ABC-1234" required />
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Max Payload (KG)</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                    <Database size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                    <input type="number" className="grow text-white font-bold placeholder:text-white/10" placeholder="1500" required />
                                </label>
                            </div>

                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Initial KM</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                    <Gauge size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                    <input type="number" className="grow text-white font-bold placeholder:text-white/10" placeholder="0" required />
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Entity Type</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                    <ClipboardList size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                    <input type="text" className="grow text-white font-bold placeholder:text-white/10" placeholder="Van / Truck" required />
                                </label>
                            </div>

                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Model Identifier</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                    <ClipboardList size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                    <input type="text" className="grow text-white font-bold placeholder:text-white/10" placeholder="E-Transit 2024" required />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="btn btn-primary btn-block h-16 rounded-[1.8rem] shadow-xl shadow-primary/20 border-none font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Register Asset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
