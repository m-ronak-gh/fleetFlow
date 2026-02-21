import React, { useState, useEffect } from 'react';
import { X, ClipboardList, Calendar, Truck, ShieldAlert, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

const ServiceModal = ({ isOpen, onClose }) => {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        vehicle_id: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        amount: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetch('http://localhost:4242/api/vehicles')
                .then(res => res.json())
                .then(data => setVehicles(data))
                .catch(err => toast.error('Failed to fetch vehicles'));
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleServiceRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4242/api/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehicle_id: formData.vehicle_id,
                    type: 'Maintenance',
                    amount: parseFloat(formData.amount) || 0,
                    description: formData.description,
                    date: formData.date
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to log service');
            }

            toast.success('Maintenance Protocol Logged');
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
                                <select
                                    className="grow bg-transparent text-white font-bold appearance-none focus:outline-none"
                                    required
                                    value={formData.vehicle_id}
                                    onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
                                >
                                    <option value="" disabled>Choose Asset</option>
                                    {vehicles.map(v => (
                                        <option key={v.id} value={v.id} className="bg-[#1a1a2e]">
                                            {v.license_plate} ({v.name})
                                        </option>
                                    ))}
                                </select>
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
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Service Date</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-error/50 transition-all shadow-inner group">
                                    <Calendar size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-error" />
                                    <input
                                        type="date"
                                        className="grow text-white font-bold placeholder:text-white/10 [color-scheme:dark]"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </label>
                            </div>
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Cost (Est.)</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-error/50 transition-all shadow-inner group">
                                    <Wallet size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-error" />
                                    <input
                                        type="number"
                                        className="grow text-white font-bold placeholder:text-white/10"
                                        placeholder="0.00"
                                        required
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </label>
                            </div>
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
