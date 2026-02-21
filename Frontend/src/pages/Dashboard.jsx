import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
    Search, Plus, Filter, Truck, AlertTriangle, Package,
    ChevronRight, Home, Settings, BarChart3, Users, Clock,
    LayoutGrid, ListFilter, SlidersHorizontal, Menu, X,
    Wrench, Wallet, MapPin, Gauge
} from 'lucide-react';
import userAvatar from '../assets/user.png';
import Cubes from '../components/Cubes';
import RegistrationModal from '../components/RegistrationModal';
import TripModal from '../components/TripModal';
import ServiceModal from '../components/ServiceModal';
import Sidebar from '../components/Sidebar';
import TripDispatch from './tripdispatch';
import Maintenance from './maintance';
import VehicleRegistration from './vehicalRegistration';
import FuelExpense from './fuelExpense';
import ExpenseModal from '../components/ExpenseModal';
import Analytics from './analatics';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
    const [isTripModalOpen, setIsTripModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    const [vehicles, setVehicles] = useState([]);
    const [trips, setTrips] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vRes, tRes, lRes] = await Promise.all([
                    fetch('http://localhost:4242/api/vehicles'),
                    fetch('http://localhost:4242/api/trips'),
                    fetch('http://localhost:4242/api/logs')
                ]);

                const vData = await vRes.json();
                const tData = await tRes.json();
                const lData = await lRes.json();

                setVehicles(vData);
                setTrips(tData);
                setLogs(lData);
            } catch (error) {
                toast.error('Failed to sync telemetry');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    async function handleLogout() {
        await logout();
        toast.success('Logged out');
        navigate('/login');
    }

    // Calculated Metrics
    const activeCount = Array.isArray(vehicles) ? vehicles.filter(v => v.status === 'On Trip').length : 0;
    const inDockCount = Array.isArray(vehicles) ? vehicles.filter(v => v.status === 'Available').length : 0;
    const maintenanceAlerts = Array.isArray(logs) ? logs.filter(l => l.type === 'Maintenance').length : 0;
    const throughput = Array.isArray(trips) ? trips.reduce((acc, curr) => acc + (parseFloat(curr.cargo_weight_kg) || 0), 0) : 0;
    const velocity = (Array.isArray(vehicles) && vehicles.length > 0) ? Math.round(((vehicles.length - vehicles.filter(v => v.status === 'Retired').length) / vehicles.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-[#060010] p-4 md:p-8 font-sans relative overflow-hidden flex flex-col md:flex-row gap-6">

            {/* Layered Kinetic Background (Deep Parallax) */}
            <div className="absolute inset-0 z-0 text-white">
                <div className="absolute inset-0 opacity-10">
                    <Cubes
                        gridSize={4}
                        maxAngle={15}
                        radius={2}
                        borderStyle="1px solid rgba(177, 158, 239, 0.1)"
                        faceColor="transparent"
                        rippleColor="#B19EEF"
                        rippleSpeed={0.3}
                        autoAnimate
                    />
                </div>
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <Cubes
                        gridSize={12}
                        maxAngle={35}
                        radius={3}
                        borderStyle="1px dashed rgba(177, 158, 239, 0.3)"
                        faceColor="transparent"
                        rippleColor="#ff6b6b"
                        rippleSpeed={1}
                        autoAnimate
                    />
                </div>
            </div>

            <Sidebar
                isNavOpen={isNavOpen}
                setIsNavOpen={setIsNavOpen}
                user={user}
                logout={handleLogout}
                handlers={{
                    vehicles: () => setIsVehicleModalOpen(true),
                    dispatch: () => setIsTripModalOpen(true),
                    maintenance: () => setIsServiceModalOpen(true)
                }}
            />

            {/* Main Content Area: Bento Grid */}
            <main className="flex-1 transition-all duration-700 relative z-10 space-y-6 overflow-y-auto">

                {/* 2. Top Search, Command Suite & Quick Actions */}
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="flex-1 bg-white/5 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/10 flex items-center gap-4 shadow-xl">
                        <div className="flex items-center px-6 py-3 bg-white/5 rounded-[1.5rem] border border-white/5 grow shadow-inner">
                            <Search className="opacity-30 mr-3 text-primary" size={20} />
                            <input className="grow bg-transparent border-none focus:outline-none text-white font-medium placeholder:text-white/20" placeholder="Analyze protocol or asset..." />
                        </div>

                        <div className="hidden sm:flex gap-3">
                            <button className="btn btn-ghost btn-sm text-white/40 hover:text-white hover:bg-white/10 rounded-xl flex gap-2 font-black uppercase tracking-[0.2em] text-[10px] bg-white/5 border-none px-4">
                                <LayoutGrid size={14} /> Group
                            </button>
                            <button className="btn btn-ghost btn-sm text-white/40 hover:text-white hover:bg-white/10 rounded-xl flex gap-2 font-black uppercase tracking-[0.2em] text-[10px] bg-white/5 border-none px-4">
                                <SlidersHorizontal size={14} /> Sort
                            </button>
                            <button className="btn btn-ghost btn-sm text-white/40 hover:text-white hover:bg-white/10 rounded-xl flex gap-2 font-black uppercase tracking-[0.2em] text-[10px] bg-white/5 border-none px-4">
                                <ListFilter size={14} /> Filter
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsTripModalOpen(true)}
                            className="flex-1 btn btn-primary rounded-[1.8rem] px-10 h-16 shadow-lg shadow-primary/20 border-none font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform flex gap-3"
                        >
                            <Plus size={22} className="text-white" /> New Trip
                        </button>
                        <button
                            onClick={() => setIsVehicleModalOpen(true)}
                            className="flex-1 btn bg-white/10 hover:bg-white/20 text-white rounded-[1.8rem] px-10 h-16 shadow-xl border border-white/10 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform flex gap-3"
                        >
                            <Truck size={22} className="opacity-60" /> New Vehicle
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Hero Metric Card */}
                    <div className="lg:col-span-2 bg-[#641ae6] group rounded-[4rem] p-12 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-[#641ae6]/40 border border-white/10">
                        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
                        <div>
                            <p className="text-white/60 font-black uppercase tracking-[0.5em] text-[9px] mb-6">Operations Velocity</p>
                            <h2 className="text-8xl font-black text-white leading-[0.8] tracking-tighter italic drop-shadow-2xl">{velocity}<span className="text-3xl not-italic ml-2 opacity-40">%</span></h2>
                            <p className="text-white/40 font-bold text-xs mt-6 uppercase tracking-[0.2em]">Active Fleet Efficiency Index</p>
                        </div>
                        <div className="mt-10 flex gap-10">
                            <div className="flex flex-col gap-1">
                                <span className="text-white font-black text-3xl italic">{activeCount}</span>
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-widest">Active</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-white/10 pl-10">
                                <span className="text-white font-black text-3xl italic">{String(inDockCount).padStart(2, '0')}</span>
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-widest">In Dock</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-white/10 pl-10">
                                <span className="text-white font-black text-3xl italic">{Math.round(throughput)}<span className="text-sm">kg</span></span>
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-widest">Throughput</span>
                            </div>
                        </div>
                    </div>

                    {/* Compact Metrics */}
                    <div className="bg-white/5 backdrop-blur-md rounded-[3.5rem] p-10 border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-all cursor-pointer shadow-lg hover:shadow-error/10">
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-error/10 rounded-[1.5rem] text-error group-hover:bg-error group-hover:text-white transition-colors">
                                <AlertTriangle size={28} />
                            </div>
                            <span className="text-error font-black text-5xl tracking-tighter italic">{String(maintenanceAlerts).padStart(2, '0')}</span>
                        </div>
                        <div>
                            <p className="text-white/80 font-black text-sm uppercase tracking-widest leading-none">Critical</p>
                            <p className="text-white/30 text-[9px] uppercase font-bold mt-2 tracking-widest">Maintenance Alerts</p>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-[3.5rem] p-10 border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-all cursor-pointer shadow-lg hover:shadow-warning/10">
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-warning/10 rounded-[1.5rem] text-warning group-hover:bg-warning group-hover:text-white transition-colors">
                                <Package size={28} />
                            </div>
                            <span className="text-white font-black text-4xl tracking-tighter italic">HIGH</span>
                        </div>
                        <div>
                            <p className="text-white/80 font-black text-sm uppercase tracking-widest leading-none">Intensity</p>
                            <p className="text-white/30 text-[9px] uppercase font-bold mt-2 tracking-widest">Cargo Logic Stream</p>
                        </div>
                    </div>
                </div>

                {/* 3. Futuristic Tabular Data Area */}
                <div className="bg-white/5 backdrop-blur-xl rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden mt-8 mb-10">
                    <div className="p-12 border-b border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div>
                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none flex items-center gap-4">
                                <div className="w-2 h-10 bg-primary rounded-full"></div> Expedition Registry
                            </h3>
                            <p className="text-[10px] opacity-30 font-black uppercase tracking-[0.5em] mt-4 ml-6">Live Synthetic Telemetry Stream Protocol</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-y-2 px-6 pb-10">
                            <thead>
                                <tr className="border-none">
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none">Protocol</th>
                                    <th className="py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none">Entity</th>
                                    <th className="py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none">Operator</th>
                                    <th className="py-8 text-[11px) font-black uppercase tracking-[0.4em] text-white/20 border-none">Hub Vector</th>
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none text-right">Status Terminal</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-4">
                                {(!Array.isArray(trips) || trips.length === 0) ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-20 opacity-20 uppercase font-black tracking-widest italic">No Active Protocols Recorded</td>
                                    </tr>
                                ) : trips.map(trip => (
                                    <tr key={trip.id} className="hover:bg-white/5 transition-all cursor-pointer group bg-white/[0.02] rounded-[2rem]">
                                        <td className="px-10 py-10 rounded-l-[2rem]">
                                            <span className="text-primary font-black text-2xl italic tracking-tighter uppercase group-hover:translate-x-2 transition-transform inline-block">
                                                TRP-{trip.id.slice(0, 4).toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 border border-white/10 group-hover:border-primary/30 group-hover:text-primary transition-all shadow-inner">
                                                    <Truck size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-white font-black text-base uppercase tracking-tighter leading-none">{trip.vehicles?.name || 'Asset'}</p>
                                                    <p className="text-[10px] opacity-20 font-black mt-2 uppercase tracking-[0.2em]">{trip.vehicles?.license_plate || 'Unidentified'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-white/80 font-black text-sm uppercase tracking-[0.1em]">{trip.drivers?.full_name || 'Autonomous'}</p>
                                            <p className="text-[9px] opacity-20 font-black uppercase tracking-[0.2em] mt-2">Class-A Prime Pilot</p>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${trip.status === 'Dispatched' ? 'bg-primary/40' : 'bg-success/40'}`}></div>
                                                <p className="text-white/40 font-black text-xs uppercase tracking-widest">{trip.status === 'Dispatched' ? 'In Transit' : 'Hub Active'}</p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10 text-right rounded-r-[2rem]">
                                            <div className="flex items-center justify-end gap-6">
                                                <div className="flex flex-col items-end">
                                                    <span className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] border ring-8 ring-offset-0 ${trip.status === 'Dispatched' ? 'bg-success/10 text-success border-success/20 ring-success/5 animate-pulse' :
                                                        trip.status === 'Completed' ? 'bg-info/10 text-info border-info/20 ring-info/5' :
                                                            'bg-white/5 text-white/20 border-white/10 ring-transparent'
                                                        }`}>
                                                        {trip.status}
                                                    </span>
                                                    <span className="text-[8px] opacity-20 font-black uppercase mt-2 tracking-widest">Telemetry Active</span>
                                                </div>
                                                <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary" size={24} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                ) : activeTab === 'dispatch' ? (
                    <TripDispatch onNewTrip={() => setIsTripModalOpen(true)} />
                ) : activeTab === 'maintenance' ? (
                    <Maintenance onCreateService={() => setIsServiceModalOpen(true)} />
                ) : activeTab === 'vehicles' ? (
                    <VehicleRegistration onNewVehicle={() => setIsVehicleModalOpen(true)} />
                ) : activeTab === 'expense' ? (
                    <FuelExpense onAddExpense={() => setIsExpenseModalOpen(true)} />
                ) : activeTab === 'analytics' ? (
                    <Analytics />
                ) : (
                    <div className="flex items-center justify-center h-[60vh] text-white/20 font-black uppercase tracking-[1em]">Operational View Pending</div>
                )}
            </main>

            {/* Modal Overlays */}
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
            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
            />
        </div>
    );
};

export default Dashboard;
