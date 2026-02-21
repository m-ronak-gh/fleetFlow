import React from 'react';

const VehicleRegistration = ({ onNewVehicle }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">

            {/* Mockup Header: Fleet Flow */}
            <div className="flex justify-between items-center bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#52b1ff] uppercase tracking-tighter leading-none">Fleet Flow</h2>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Asset Management Protocol</p>
                </div>
            </div>

            {/* Command Search Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-center bg-white/5 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/10">
                <div className="flex-1 flex items-center px-6 py-3 bg-black/40 rounded-[1.5rem] border border-white/10 shadow-inner w-full">
                    <span className="text-white/20 text-xs font-bold mr-4">Search bar ......</span>
                    <input className="grow bg-transparent border-none focus:outline-none text-white text-sm" />
                </div>
                <div className="flex gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar items-center">
                    <button className="px-6 py-3 bg-black/40 hover:bg-white/5 text-white/60 hover:text-white rounded-[1.2rem] border border-white/10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Group by</button>
                    <button className="px-6 py-3 bg-black/40 hover:bg-white/5 text-white/60 hover:text-white rounded-[1.2rem] border border-white/10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Filter</button>
                    <button className="px-8 py-3 bg-black/40 hover:bg-white/5 text-white/60 hover:text-white rounded-[1.2rem] border border-white/10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Sort by...</button>

                    <button
                        onClick={onNewVehicle}
                        className="ml-4 px-8 py-3 bg-[#52b1ff]/20 hover:bg-[#52b1ff]/30 text-[#52b1ff] rounded-[1.2rem] border border-[#52b1ff]/30 text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-[0_0_20px_rgba(82,177,255,0.2)] transition-all hover:scale-105"
                    >
                        + New Vehicle
                    </button>
                </div>
            </div>

            {/* Vehicle Registry (Asset Management) Table */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-white/5">
                    <h3 className="text-lg font-black text-white/80 uppercase tracking-widest">3. Vehicle Registry (Asset Management)</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-0">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">NO</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Plate</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Model</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Type</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Capacity</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Odometer</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Status</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-black/20">
                            <tr className="hover:bg-white/5 transition-all group">
                                <td className="px-8 py-8">
                                    <span className="text-white/60 font-black text-sm tracking-tight">1</span>
                                </td>
                                <td className="px-8 py-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#52b1ff] font-bold tracking-tight uppercase">MH 00</span>
                                        <div className="flex flex-col mt-4 gap-3 opacity-30">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white ml-1"></div>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-8 text-white/80 font-medium tracking-tight">2017</td>
                                <td className="px-8 py-8 text-white/80 font-medium">Mini</td>
                                <td className="px-8 py-8 text-white/80 font-medium">5 tonn</td>
                                <td className="px-8 py-8 text-white/80 font-medium">79000</td>
                                <td className="px-8 py-8">
                                    <span className="text-white/40 font-black text-[11px] uppercase tracking-widest">Idle</span>
                                </td>
                                <td className="px-8 py-8 text-right">
                                    <button className="text-orange-500 hover:text-orange-400 font-black text-lg transition-colors scale-125 px-4">X</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default VehicleRegistration;
