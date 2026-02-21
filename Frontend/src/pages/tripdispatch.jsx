import React from 'react';

const TripDispatch = ({ onNewTrip }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">

            {/* Mockup Header: Fleet Flow */}
            <div className="flex justify-between items-center bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <h2 className="text-2xl font-black text-[#52b1ff] uppercase tracking-tighter">Fleet Flow</h2>
                <div className="w-6 h-6 rounded-full border-2 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
            </div>

            {/* Command Search Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-center bg-white/5 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/10">
                <div className="flex-1 flex items-center px-6 py-3 bg-black/40 rounded-[1.5rem] border border-white/10 shadow-inner w-full">
                    <span className="text-white/20 text-xs font-bold mr-4">Search bar ......</span>
                    <input className="grow bg-transparent border-none focus:outline-none text-white text-sm" />
                </div>
                <div className="flex gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
                    <button className="px-6 py-3 bg-black/40 hover:bg-white/5 text-white/60 hover:text-white rounded-[1.2rem] border border-white/10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Group by</button>
                    <button className="px-6 py-3 bg-black/40 hover:bg-white/5 text-white/60 hover:text-white rounded-[1.2rem] border border-white/10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Filter</button>
                    <button className="px-8 py-3 bg-black/40 hover:bg-white/5 text-white/60 hover:text-white rounded-[1.2rem] border border-white/10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Sort by...</button>
                </div>
            </div>

            {/* Dispatch Table (Pinkish mockup style) */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-0">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">#</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Trip Fleet Type</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Origin</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Destination</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-black/20">
                            <tr className="hover:bg-white/5 transition-all group">
                                <td className="px-8 py-8 font-black text-[#ff719a] opacity-60">1</td>
                                <td className="px-8 py-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-bold tracking-tight">Trailer Truck</span>
                                        <div className="flex flex-col mt-2 gap-2 opacity-20">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-8 text-white font-medium opacity-80">Mumbai</td>
                                <td className="px-8 py-8 text-white font-medium opacity-80">Pune</td>
                                <td className="px-8 py-8 text-right">
                                    <span className="text-orange-400 font-black text-[11px] uppercase tracking-widest">On way</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Action Footer */}
                <div className="p-8 border-t border-white/5 bg-black/40">
                    <button
                        onClick={onNewTrip}
                        className="px-10 py-4 bg-green-950/30 hover:bg-green-500/20 text-green-400 rounded-2xl border border-green-500/30 font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105"
                    >
                        + New Trip Entry
                    </button>
                </div>
            </div>

        </div>
    );
};

export default TripDispatch;
