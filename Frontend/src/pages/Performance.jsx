import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
    Search, Plus, Filter, User, ShieldAlert, TrendingUp, AlertCircle,
    ChevronRight, Home, Settings, BarChart3, Users, Clock,
    LayoutGrid, ListFilter, SlidersHorizontal, Menu, X,
    ShieldCheck, Calendar
} from 'lucide-react';
import userAvatar from '../assets/user.png';
import Cubes from '../components/Cubes';
import DriverRegistrationModal from '../components/DriverRegistrationModal';
import RegistrationModal from '../components/RegistrationModal';
import TripModal from '../components/TripModal';
import ServiceModal from '../components/ServiceModal';
import Sidebar from '../components/Sidebar';

const Performance = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
    const [isTripModalOpen, setIsTripModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const res = await fetch('http://localhost:4242/api/drivers');
            const data = await res.json();
            setDrivers(data);
        } catch (error) {
            toast.error('Failed to sync safety profiles');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'On Duty' ? 'Off Duty' : 'On Duty';
        try {
            const res = await fetch(`http://localhost:4242/api/drivers/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus })
            });
            if (res.ok) {
                setDrivers(drivers.map(d => d.id === id ? { ...d, status: nextStatus } : d));
                toast.success(`Operator status: ${nextStatus}`);
            }
        } catch (error) {
            toast.error('Protocol override failed');
        }
    };


    const filteredDrivers = Array.isArray(drivers) ? drivers.filter(d =>
        d.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        d.license_number?.toLowerCase().includes(search.toLowerCase())
    ) : [];

    return (
        <div className="min-h-screen bg-[#060010] p-4 md:p-8 font-sans relative overflow-hidden flex flex-col md:flex-row gap-6">

            <div className="absolute inset-0 z-0">
                <Cubes gridSize={12} maxAngle={15} radius={4} faceColor="transparent" borderStyle="1px solid rgba(177, 158, 239, 0.05)" rippleColor="#B19EEF" rippleSpeed={0.5} autoAnimate />
            </div>

            <Sidebar
                isNavOpen={isNavOpen}
                setIsNavOpen={setIsNavOpen}
                user={user}
                logout={logout}
                handlers={{
                    vehicles: () => setIsVehicleModalOpen(true),
                    dispatch: () => setIsTripModalOpen(true),
                    maintenance: () => setIsServiceModalOpen(true)
                }}
            />

            {/* Main Content */}
            <main className="flex-1 space-y-8 relative z-10 overflow-y-auto custom-scrollbar">

                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">Safety Profiles</h1>
                        <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                            <ShieldAlert size={12} className="text-primary" /> Driver Performance & Behavioral Analysis
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Scan Registry..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all w-full sm:w-64 font-bold"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-primary h-12 rounded-2xl gap-3 px-6 shadow-lg shadow-primary/20 border-none group hover:scale-105 transition-all"
                        >
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                            <span className="font-bold uppercase text-[10px] tracking-widest">Enlist Operator</span>
                        </button>
                    </div>
                </header>

                {/* Performance Table */}
                <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="bg-transparent text-white/20 font-black uppercase text-[10px] tracking-[0.3em] py-8 pl-10">Operator</th>
                                    <th className="bg-transparent text-white/20 font-black uppercase text-[10px] tracking-[0.3em]">Credentials</th>
                                    <th className="bg-transparent text-white/20 font-black uppercase text-[10px] tracking-[0.3em]">Expiry</th>
                                    <th className="bg-transparent text-white/20 font-black uppercase text-[10px] tracking-[0.3em]">Safety Score</th>
                                    <th className="bg-transparent text-white/20 font-black uppercase text-[10px] tracking-[0.3em]">Duty Status</th>
                                    <th className="bg-transparent text-white/20 font-black uppercase text-[10px] tracking-[0.3em] pr-10">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr><td colSpan="6" className="text-center py-20 opacity-20 uppercase font-black tracking-widest">Syncing Registry...</td></tr>
                                ) : filteredDrivers.map((d) => (
                                    <tr key={d.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-6 pl-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                    <User size={20} />
                                                </div>
                                                <span className="font-bold text-white text-sm">{d.full_name}</span>
                                            </div>
                                        </td>
                                        <td className="text-white/60 font-mono text-xs font-bold uppercase">{d.license_number}</td>
                                        <td>
                                            <div className="flex flex-col gap-1">
                                                <span className={`text-[10px] font-black uppercase ${new Date(d.license_expiry) < new Date() ? 'text-error' : 'text-white/40'}`}>
                                                    {new Date(d.license_expiry).toLocaleDateString()}
                                                </span>
                                                {new Date(d.license_expiry) < new Date() && (
                                                    <span className="badge badge-error badge-xs font-black text-[7px] uppercase tracking-tighter">Expired</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                                                    <div className={`h-full transition-all duration-1000 ${d.safety_score > 80 ? 'bg-success' : d.safety_score > 50 ? 'bg-warning' : 'bg-error'}`} style={{ width: `${d.safety_score}%` }} />
                                                </div>
                                                <span className="font-black text-white text-[10px]">{d.safety_score}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${d.status === 'On Duty' ? 'bg-success shadow-[0_0_8px_rgba(52,211,153,0.5)]' : d.status === 'Suspended' ? 'bg-error' : 'bg-white/20'}`} />
                                                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{d.status}</span>
                                            </div>
                                        </td>
                                        <td className="pr-10">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => toggleStatus(d.id, d.status)} className="p-2 bg-white/5 hover:bg-primary/20 rounded-xl transition-all">
                                                    <Clock size={14} className="text-white/60" />
                                                </button>
                                                <button className="p-2 bg-white/5 hover:bg-error/20 rounded-xl transition-all">
                                                    <AlertCircle size={14} className="text-white/60" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <DriverRegistrationModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); fetchDrivers(); }} />
            <RegistrationModal
                isOpen={isVehicleModalOpen}
                onClose={() => setIsVehicleModalOpen(false)}
            />
            <TripModal
                isOpen={isTripModalOpen}
                onClose={() => setIsTripModalOpen(false)}
            />
            <ServiceModal
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
            />
        </div>
    );
};

export default Performance;
