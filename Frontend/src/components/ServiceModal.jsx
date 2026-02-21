import React from 'react';
import { X, ClipboardList, Calendar, Truck, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const ServiceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleServiceRequest = (e) => {
        e.preventDefault();
        toast.success('Maintenance Protocol Logged');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#060010]/60 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(255,107,107,0.1)] overflow-hidden animate-in zoom-in-95 fade-in duration-500">

                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-error/20 to-transparent pointer-events-none" />

                <form className="relative p-10 sm:p-12 space-y-8" onSubmit={handleServiceRequest}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-error/20 rounded-2xl text-error">
                                <ShieldAlert size={24} />
                            </div>
                            <h3 className="font-black text-2xl text-white italic tracking-tighter uppercase leading-none">Vehicle Service</h3>
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
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Vehicle Identifier</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-error/50 transition-all shadow-inner group">
                                <Truck size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-error" />
                                <input type="text" className="grow text-white font-bold placeholder:text-white/10 uppercase" placeholder="TRP-XXXX" required />
                            </label>
                        </div>

                        <div className="text-left">
                            <label className="label py-1">
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Maintenance Objective</span>
                            </label>
                            <div className="relative group">
                                <ClipboardList size={18} className="absolute left-4 top-4 opacity-30 group-focus-within:opacity-100 transition-opacity text-error" />
                                <textarea
                                    className="textarea textarea-bordered w-full rounded-2xl min-h-[120px] bg-white/5 border-white/10 focus:border-error/50 transition-all pl-12 text-white font-medium placeholder:text-white/10"
                                    placeholder="Describe the issues or required services..."
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="text-left">
                            <label className="label py-1">
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Service Date</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-error/50 transition-all shadow-inner group">
                                <Calendar size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-error" />
                                <input type="date" className="grow text-white font-bold placeholder:text-white/10 [color-scheme:dark]" required />
                            </label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="btn btn-error btn-block h-16 rounded-[1.8rem] shadow-xl shadow-error/20 border-none font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Authorize Service Protocol
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceModal;
