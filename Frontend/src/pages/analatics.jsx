import React from 'react';
import { TrendingUp, Fuel, BarChart3, Activity } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 pb-10">

            {/* Header: Fleet Flow */}
            <div className="flex justify-between items-center bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#52b1ff] uppercase tracking-tighter leading-none">Fleet Flow</h2>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Operational Intelligence Terminal</p>
                </div>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Fuel Cost', value: 'Rs. 2.6 L', icon: Fuel, color: 'text-success' },
                    { label: 'Fleet ROI', value: '+ 12.5%', icon: TrendingUp, color: 'text-success' },
                    { label: 'Utilization Rate', value: '82%', icon: Activity, color: 'text-success' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-success/30 shadow-[0_0_30px_rgba(34,197,94,0.1)] flex flex-col items-center justify-center text-center group hover:scale-105 transition-all duration-500">
                        <stat.icon size={24} className={`${stat.color} mb-4 opacity-50 group-hover:opacity-100 transition-opacity`} />
                        <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px] mb-2">{stat.label}</p>
                        <h3 className={`text-3xl font-black ${stat.color} italic tracking-tighter`}>{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart 1: Fuel Efficiency Trend */}
                <div className="bg-[#f4f1ea] rounded-[2.5rem] p-8 shadow-2xl border border-black/5 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <h4 className="text-black/80 font-bold text-lg mb-6 tracking-tight flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-black/20 rounded-full"></div> Fuel Efficiency Trend (kmL)
                    </h4>
                    <div className="h-64 w-full bg-transparent flex items-center justify-center border-l-2 border-b-2 border-black/10 relative">
                        {/* Mock simple SVG line chart for "hand-drawn" feel */}
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
                            <path d="M 0 180 L 50 120 L 100 150 L 150 80 L 200 160 L 250 100 L 300 130 L 350 70 L 400 90" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M 0 150 L 50 170 L 100 130 L 150 110 L 200 100 L 250 90 L 300 80 L 350 70 L 400 85" fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                            {/* Dots */}
                            {[[50, 120], [150, 80], [250, 100], [350, 70]].map(([x, y], i) => (
                                <circle key={i} cx={x} cy={y} r="4" fill="black" />
                            ))}
                        </svg>
                        <div className="absolute bottom-[-25px] flex w-full justify-between text-[10px] font-bold text-black/30 px-2 uppercase italic">
                            <span>Jan</span><span>Dec</span><span>Jan</span><span>Dec</span><span>Sec</span>
                        </div>
                    </div>
                </div>

                {/* Chart 2: Top 5 Costliest Vehicles */}
                <div className="bg-[#f4f1ea] rounded-[2.5rem] p-8 shadow-2xl border border-black/5 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <h4 className="text-black/80 font-bold text-lg mb-6 tracking-tight flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-black/20 rounded-full"></div> Top 5 Costliest Vehicles
                    </h4>
                    <div className="h-64 w-full bg-transparent flex items-end justify-around border-l-2 border-b-2 border-black/10 relative pb-2 pt-10">
                        {[40, 60, 100, 160, 200].map((h, i) => (
                            <div key={i} className="w-12 bg-black/5 border-2 border-black/20 relative group/bar transition-all" style={{ height: `${h}px` }}>
                                <div className="absolute inset-0 bg-transparent opacity-10 group-hover/bar:bg-black transition-colors" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 10px)' }}></div>
                            </div>
                        ))}
                        <div className="absolute bottom-[-25px] flex w-full justify-around text-[10px] font-bold text-black/30 uppercase italic">
                            <span>VAN-03</span><span>TRK-01</span><span>TRK-05</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Summary Table */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden mt-8">
                <div className="p-8 border-b border-white/5 flex justify-center">
                    <div className="px-8 py-3 bg-[#52b1ff]/10 rounded-2xl border border-[#52b1ff]/30">
                        <h3 className="text-sm font-black text-[#52b1ff] uppercase tracking-widest text-center">Financial Summary of Month</h3>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-0">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Month</th>
                                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Revenue</th>
                                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Fuel Cost</th>
                                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5">Maintenance</th>
                                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-tighter text-[#ff719a] border-b border-white/5 text-right">Net Profit</th>
                            </tr>
                        </thead>
                        <tbody className="bg-black/20">
                            <tr className="hover:bg-white/5 transition-all group">
                                <td className="px-10 py-10">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-black text-sm tracking-tight uppercase">Jan</span>
                                        <div className="flex flex-col mt-4 gap-3 opacity-30">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white ml-1"></div>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-10 text-white font-bold tracking-tight">Rs. 17L</td>
                                <td className="px-10 py-10 text-white/80 font-medium tracking-tight">Rs. 6L</td>
                                <td className="px-10 py-10 text-white/80 font-medium tracking-tight">Rs. 2L</td>
                                <td className="px-10 py-10 text-right">
                                    <span className="text-[#52b1ff] font-black text-sm tracking-tight">Rs. 9L</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Analytics;
