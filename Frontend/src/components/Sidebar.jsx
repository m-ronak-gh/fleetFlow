import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutGrid, Truck, MapPin, Wrench, Gauge, BarChart3,
    Menu, X, Settings
} from 'lucide-react';
import userAvatar from '../assets/user.png';

const Sidebar = ({ isNavOpen, setIsNavOpen, user, logout, handlers }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
        { id: 'vehicles', label: 'Vehicle Registration', icon: Truck, action: 'vehicles' },
        { id: 'dispatch', label: 'Trip Dispatch', icon: MapPin, action: 'dispatch' },
        { id: 'maintenance', label: 'Maintenance', icon: Wrench, action: 'maintenance' },
        { id: 'performance', label: 'Performance', icon: Gauge, path: '/performance' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    const currentPath = location.pathname;
    const activeTab = currentPath.includes('performance') ? 'performance' : 'dashboard';

    return (
        <aside className={`relative z-30 transition-all duration-700 ease-in-out ${isNavOpen ? 'w-full h-auto' : 'w-full h-24'} md:w-80 md:h-auto bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 flex flex-col items-center shadow-2xl overflow-hidden`}>
            <div className="w-full flex items-center justify-between md:justify-center p-6 gap-4">
                <div className="p-3 bg-primary/20 rounded-[1.2rem] text-primary transition-transform hover:rotate-12">
                    <Truck size={28} />
                </div>
                <span className={`text-xl font-black text-white italic tracking-tighter hidden md:block animate-in fade-in slide-in-from-left-4 duration-500 uppercase ${isNavOpen ? 'block' : 'hidden md:block'}`}>FLEETFLOW</span>
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="md:hidden p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all active:scale-90"
                >
                    {isNavOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <div className={`w-full px-4 space-y-2 mb-8 flex-1 overflow-y-auto no-scrollbar transition-all duration-700 ${isNavOpen ? 'opacity-100 flex flex-col' : 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto flex flex-col md:flex'}`}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            if (item.path) {
                                navigate(item.path);
                            } else if (item.action && handlers?.[item.action]) {
                                handlers[item.action]();
                            }
                        }}
                        className={`w-full flex items-center ${isNavOpen ? 'justify-start px-6 gap-4' : 'md:justify-start md:px-6 md:gap-4 justify-center'} p-4 rounded-[1.5rem] transition-all group shrink-0 ${activeTab === item.id
                            ? 'text-white bg-primary shadow-lg shadow-primary/20 scale-[1.02]'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <item.icon size={22} className={`${activeTab === item.id ? 'text-white' : 'group-hover:text-primary transition-colors'}`} />
                        <span className={`font-bold text-[10px] tracking-widest uppercase text-left whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300 ${isNavOpen ? 'block' : 'hidden md:block'}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            <div className={`mt-auto w-full p-6 flex flex-col gap-6 items-center transition-all duration-700 ${isNavOpen ? 'opacity-100' : 'opacity-0 md:opacity-100 md:flex'}`}>
                <button
                    onClick={logout}
                    className={`w-full flex items-center justify-start px-6 gap-4 p-4 text-error/60 hover:text-error hover:bg-error/10 rounded-[1.5rem] transition-all animate-in fade-in slide-in-from-bottom-2 duration-500 font-bold text-sm tracking-widest uppercase ${isNavOpen ? 'flex' : 'hidden md:flex'}`}
                >
                    <Settings size={22} />
                    <span>Logout</span>
                </button>

                <div className={`flex items-center gap-4 w-full ${isNavOpen ? 'justify-start px-2' : 'md:justify-start md:px-2 justify-center'}`}>
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
                    <div className={`hidden md:block animate-in fade-in slide-in-from-left-2 duration-500 ${isNavOpen ? 'block' : 'hidden md:block'}`}>
                        <p className="text-white font-black text-sm tracking-tighter leading-none">{user?.user_metadata?.full_name || 'Operator'}</p>
                        <p className="text-white/40 text-[10px] uppercase font-bold mt-1">{user?.user_metadata?.role || 'User'}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
