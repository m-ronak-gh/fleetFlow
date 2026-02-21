import React, { useState } from 'react';
import {
    Search, Plus, Filter, Truck, AlertTriangle, Package,
    ChevronRight, Home, Settings, BarChart3, Users, Clock,
    LayoutGrid, ListFilter, SlidersHorizontal, Menu, X
} from 'lucide-react';
import userAvatar from '../assets/user.png';
import Cubes from '../components/Cubes';

const Dashboard = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#060010] p-4 md:p-8 font-sans relative overflow-hidden flex flex-col md:flex-row gap-6">

            {/* Layered Kinetic Background (Deep Parallax) */}
            <div className="absolute inset-0 z-0">
                {/* Layer 1: Distant, Large Cubes */}
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
                {/* Layer 2: Near, Fine Grid */}
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

            {/* 1. Futuristic Collapsible Navigation Dock (Left) */}
            <aside className={`relative z-30 transition-all duration-700 ease-in-out ${isNavOpen ? 'md:w-64 w-full h-auto' : 'md:w-24 w-full h-24'} bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 flex flex-col items-center shadow-2xl overflow-hidden`}>

                {/* Toggle / Logo Area */}
                <div className="w-full flex items-center justify-between md:justify-center p-6 gap-4">
                    <div className="p-3 bg-primary/20 rounded-[1.2rem] text-primary transition-transform hover:rotate-12">
                        <Truck size={28} />
                    </div>
                    {isNavOpen && <span className="text-xl font-black text-white italic tracking-tighter hidden md:block animate-in fade-in slide-in-from-left-4 duration-500">FLEETFLOW</span>}
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all active:scale-90"
                    >
                        {isNavOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Nav Buttons (Hidden when !isNavOpen on mobile, vertical stack on desktop) */}
                <div className={`w-full px-4 space-y-4 mb-8 transition-all duration-700 ${isNavOpen ? 'opacity-100 flex flex-col' : 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto flex flex-col'}`}>
                    <button className={`w-full flex items-center ${isNavOpen ? 'justify-start px-6 gap-4' : 'justify-center'} p-4 text-white bg-primary rounded-[1.5rem] transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]`}>
                        <Home size={24} />
                        {isNavOpen && <span className="font-bold text-sm tracking-widest uppercase animate-in fade-in slide-in-from-left-2 duration-300">Dashboard</span>}
                    </button>
                    <button className={`w-full flex items-center ${isNavOpen ? 'justify-start px-6 gap-4' : 'justify-center'} p-4 text-white/40 hover:text-white hover:bg-white/5 rounded-[1.5rem] transition-all group`}>
                        <BarChart3 size={24} className="group-hover:text-primary transition-colors" />
                        {isNavOpen && <span className="font-bold text-sm tracking-widest uppercase text-left animate-in fade-in slide-in-from-left-2 duration-300">Intelligence</span>}
                    </button>
                    <button className={`w-full flex items-center ${isNavOpen ? 'justify-start px-6 gap-4' : 'justify-center'} p-4 text-white/40 hover:text-white hover:bg-white/5 rounded-[1.5rem] transition-all group`}>
                        <Users size={24} className="group-hover:text-primary transition-colors" />
                        {isNavOpen && <span className="font-bold text-sm tracking-widest uppercase animate-in fade-in slide-in-from-left-2 duration-300">Operators</span>}
                    </button>
                </div>

                {/* Profile / Bottom Area */}
                <div className={`mt-auto w-full p-6 flex flex-col gap-6 items-center transition-all duration-700 ${isNavOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                    {isNavOpen && (
                        <button className="w-full flex items-center justify-start px-6 gap-4 p-4 text-white/40 hover:text-white hover:bg-white/5 rounded-[1.5rem] transition-all animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <Settings size={22} />
                            <span className="font-bold text-sm tracking-widest uppercase">Registry</span>
                        </button>
                    )}
                    <div className={`flex items-center gap-4 w-full ${isNavOpen ? 'justify-start px-2' : 'justify-center'}`}>
                        <div className="avatar">
                            <div className="w-14 h-14 rounded-[1.2rem] ring-2 ring-primary/30 ring-offset-base-100 ring-offset-2 overflow-hidden border border-white/10 transition-transform hover:scale-110 cursor-pointer bg-[#1a1a2e]">
                                <img
                                    src={userAvatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    style={{ filter: 'sepia(1) hue-rotate(240deg) saturate(3) brightness(0.9)' }}
                                />
                            </div>
                        </div>
                        {isNavOpen && (
                            <div className="hidden md:block animate-in fade-in slide-in-from-left-2 duration-500">
                                <p className="text-white font-black text-sm tracking-tighter leading-none">Commander Axel</p>
                                <p className="text-white/40 text-[10px] uppercase font-bold mt-1">Prime Operator</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

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
                        <button className="flex-1 btn btn-primary rounded-[1.8rem] px-10 h-16 shadow-lg shadow-primary/20 border-none font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform flex gap-3">
                            <Plus size={22} className="text-white" /> New Trip
                        </button>
                        <button className="flex-1 btn bg-white/10 hover:bg-white/20 text-white rounded-[1.8rem] px-10 h-16 shadow-xl border border-white/10 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform flex gap-3">
                            <Truck size={22} className="opacity-60" /> New Vehicle
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Hero Metric Card with enhanced visuals */}
                    <div className="lg:col-span-2 bg-[#641ae6] group rounded-[4rem] p-12 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-[#641ae6]/40 border border-white/10">
                        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
                        <div>
                            <p className="text-white/60 font-black uppercase tracking-[0.5em] text-[9px] mb-6">Operations Velocity</p>
                            <h2 className="text-8xl font-black text-white leading-[0.8] tracking-tighter italic drop-shadow-2xl">84<span className="text-3xl not-italic ml-2 opacity-40">%</span></h2>
                            <p className="text-white/40 font-bold text-xs mt-6 uppercase tracking-[0.2em]">Active Fleet Efficiency Index</p>
                        </div>
                        <div className="mt-10 flex gap-10">
                            <div className="flex flex-col gap-1">
                                <span className="text-white font-black text-3xl italic">12</span>
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-widest">Active</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-white/10 pl-10">
                                <span className="text-white font-black text-3xl italic">03</span>
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-widest">In Dock</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-white/10 pl-10">
                                <span className="text-white font-black text-3xl italic">850<span className="text-sm">kg</span></span>
                                <span className="text-white/30 text-[9px] uppercase font-black tracking-widest">Throughput</span>
                            </div>
                        </div>
                    </div>

                    {/* Compact Metrics with glass hover */}
                    <div className="bg-white/5 backdrop-blur-md rounded-[3.5rem] p-10 border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-all cursor-pointer shadow-lg hover:shadow-error/10">
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-error/10 rounded-[1.5rem] text-error group-hover:bg-error group-hover:text-white transition-colors">
                                <AlertTriangle size={28} />
                            </div>
                            <span className="text-error font-black text-5xl tracking-tighter italic">03</span>
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
                        <div className="flex gap-4">
                            <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white transition-all border border-white/5"><SlidersHorizontal size={20} /></button>
                            <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white transition-all border border-white/5"><Clock size={20} /></button>
                            <button className="btn btn-neutral rounded-2xl px-6 h-14 font-black uppercase tracking-widest text-[10px]">Registry Logs</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-y-2 px-6 pb-10">
                            <thead>
                                <tr className="border-none">
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none">Protocol</th>
                                    <th className="py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none">Entity</th>
                                    <th className="py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none">Operator</th>
                                    <th className="py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none">Hub Vector</th>
                                    <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 border-none text-right">Status Terminal</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-4">
                                <tr className="hover:bg-white/5 transition-all cursor-pointer group bg-white/[0.02] rounded-[2rem]">
                                    <td className="px-10 py-10 rounded-l-[2rem]">
                                        <span className="text-primary font-black text-2xl italic tracking-tighter uppercase group-hover:translate-x-2 transition-transform inline-block">TRP-9021</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 border border-white/10 group-hover:border-primary/30 group-hover:text-primary transition-all shadow-inner">
                                                <Truck size={24} />
                                            </div>
                                            <div>
                                                <p className="text-white font-black text-base uppercase tracking-tighter leading-none">Van-05</p>
                                                <p className="text-[10px] opacity-20 font-black mt-2 uppercase tracking-[0.2em]">Ford Transit Pro</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="text-white/80 font-black text-sm uppercase tracking-[0.1em]">Alex Johnson</p>
                                        <p className="text-[9px] opacity-20 font-black uppercase tracking-[0.2em] mt-2">Class-A Prime Pilot</p>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                            <p className="text-white/40 font-black text-xs uppercase tracking-widest">North Sector-7</p>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 text-right rounded-r-[2rem]">
                                        <div className="flex items-center justify-end gap-6">
                                            <div className="flex flex-col items-end">
                                                <span className="px-6 py-2 bg-success/10 rounded-full text-success font-black text-[10px] uppercase tracking-[0.3em] border border-success/20 ring-8 ring-success/5 animate-pulse">Running</span>
                                                <span className="text-[8px] opacity-20 font-black uppercase mt-2 tracking-widest">Telemetry Active</span>
                                            </div>
                                            <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary" size={24} />
                                        </div>
                                    </td>
                                </tr>

                                <tr className="hover:bg-white/5 transition-all cursor-pointer group bg-white/[0.02] rounded-[2rem]">
                                    <td className="px-10 py-10 rounded-l-[2rem]">
                                        <span className="text-primary font-black text-2xl italic tracking-tighter uppercase group-hover:translate-x-2 transition-transform inline-block">TRP-9022</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 border border-white/10 group-hover:border-primary/30 group-hover:text-primary transition-all shadow-inner">
                                                <Truck size={24} />
                                            </div>
                                            <div>
                                                <p className="text-white font-black text-base uppercase tracking-tighter leading-none">Truck-02</p>
                                                <p className="text-[10px] opacity-20 font-black mt-2 uppercase tracking-[0.2em]">Mercedes Entity</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="text-white/80 font-black text-sm uppercase tracking-[0.1em]">Sarah Connor</p>
                                        <p className="text-[9px] opacity-20 font-black uppercase tracking-[0.2em] mt-2">Fleet Overseer</p>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                                            <p className="text-white/40 font-black text-xs uppercase tracking-widest">East Port-B</p>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 text-right rounded-r-[2rem]">
                                        <div className="flex items-center justify-end gap-6">
                                            <div className="flex flex-col items-end">
                                                <span className="px-6 py-2 bg-white/5 rounded-full text-white/20 font-black text-[10px] uppercase tracking-[0.3em] border border-white/10">Standby</span>
                                                <span className="text-[8px] opacity-10 font-black uppercase mt-2 tracking-widest">Idle Link</span>
                                            </div>
                                            <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary" size={24} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
