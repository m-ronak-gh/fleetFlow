import React from 'react';
import { X, Wallet, Hash, User, Fuel, Receipt } from 'lucide-react';
import toast from 'react-hot-toast';

const ExpenseModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        toast.success('Expense Protocol Synchronized');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#060010]/60 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(34,211,238,0.1)] overflow-hidden animate-in zoom-in-95 fade-in duration-500">

                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none" />

                <form className="relative p-10 sm:p-12 space-y-8" onSubmit={handleExpenseSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-cyan-500/20 rounded-2xl text-cyan-400">
                                <Wallet size={24} />
                            </div>
                            <h3 className="font-black text-2xl text-white italic tracking-tighter uppercase leading-none">New Expense</h3>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all active:scale-90"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="text-left">
                            <label className="label py-1">
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Trip Identifier</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-cyan-500/50 transition-all shadow-inner group">
                                <Hash size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-cyan-400" />
                                <input type="text" className="grow text-white font-bold placeholder:text-white/10 uppercase" placeholder="TRP-321" required />
                            </label>
                        </div>

                        <div className="text-left">
                            <label className="label py-1">
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Operator Name</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-cyan-500/50 transition-all shadow-inner group">
                                <User size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-cyan-400" />
                                <input type="text" className="grow text-white font-bold placeholder:text-white/10" placeholder="John Doe" required />
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Fuel Cost</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-cyan-500/50 transition-all shadow-inner group">
                                    <Fuel size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-cyan-400" />
                                    <input type="text" className="grow text-white font-bold placeholder:text-white/10" placeholder="19,000" required />
                                </label>
                            </div>

                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Misc Expense</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-cyan-500/50 transition-all shadow-inner group">
                                    <Receipt size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-cyan-400" />
                                    <input type="text" className="grow text-white font-bold placeholder:text-white/10" placeholder="3,000" required />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 btn bg-white/5 hover:bg-white/10 text-white/60 border-white/10 h-16 rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-xs transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] btn bg-cyan-500 hover:bg-cyan-600 border-none text-white h-16 rounded-[1.8rem] shadow-xl shadow-cyan-500/20 font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Create Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseModal;
