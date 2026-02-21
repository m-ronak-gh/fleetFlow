import React, { useState } from 'react';
import { X, Truck, Hash, Gauge, Database, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';

const RegistrationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        license_plate: '',
        max_capacity_kg: '',
        odometer: 0,
        status: 'Available'
    });

    if (!isOpen) return null;

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4242/api/vehicles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    license_plate: formData.license_plate,
                    max_capacity_kg: parseFloat(formData.max_capacity_kg),
                    odometer: parseInt(formData.odometer)
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to register vehicle');
            }

            toast.success('Registration Protocol Initiated');
            onClose();
            // In a real app, you'd trigger a refresh of the dashboard data here
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with aggressive blur */}
            <div
                className="absolute inset-0 bg-[#060010]/60 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(177,158,239,0.15)] overflow-hidden animate-in zoom-in-95 fade-in duration-500">

                {/* Header Decoration */}
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
                        {/* Licence Plate */}
                        <div className="text-left">
                            <label className="label py-1">
                                <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">License Plate</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                <Hash size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                <input
                                    type="text"
                                    className="grow text-white font-bold placeholder:text-white/10 uppercase"
                                    placeholder="ABC-1234"
                                    required
                                    value={formData.license_plate}
                                    onChange={(e) => setFormData({ ...formData, license_plate: e.target.value })}
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Max Payload */}
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Max Payload (KG)</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                    <Database size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                    <input
                                        type="number"
                                        className="grow text-white font-bold placeholder:text-white/10"
                                        placeholder="1500"
                                        required
                                        value={formData.max_capacity_kg}
                                        onChange={(e) => setFormData({ ...formData, max_capacity_kg: e.target.value })}
                                    />
                                </label>
                            </div>

                            {/* Odometer */}
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Initial KM</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                    <Gauge size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                    <input
                                        type="number"
                                        className="grow text-white font-bold placeholder:text-white/10"
                                        placeholder="0"
                                        required
                                        value={formData.odometer}
                                        onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Type */}
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Entity Type</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                    <ClipboardList size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                    <input
                                        type="text"
                                        className="grow text-white font-bold placeholder:text-white/10"
                                        placeholder="Van / Truck"
                                        required
                                    // Using 'type' indirectly or just mapping it to something? 
                                    // The table only has 'name' which can be 'Van-05' etc.
                                    />
                                </label>
                            </div>

                            {/* Model */}
                            <div className="text-left">
                                <label className="label py-1">
                                    <span className="label-text-alt font-black uppercase tracking-[0.3em] text-white/30 text-[9px]">Model Identifier</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 w-full bg-white/5 border-white/10 focus-within:border-primary/50 transition-all shadow-inner group">
                                    <ClipboardList size={18} className="opacity-30 group-focus-within:opacity-100 transition-opacity text-primary" />
                                    <input
                                        type="text"
                                        className="grow text-white font-bold placeholder:text-white/10"
                                        placeholder="E-Transit 2024"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="btn btn-primary btn-block h-16 rounded-[1.8rem] shadow-xl shadow-primary/20 border-none font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Register Asset
                        </button>
                        <p className="text-center text-[8px] opacity-20 font-black uppercase tracking-[0.5em] mt-8">Secure Fleet Registry Protocol Enabled</p>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default RegistrationModal;
