import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        toast.success('Logged out');
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-6 font-sans">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body items-center text-center gap-4">
                    <h1 className="card-title text-2xl font-bold">FleetFlow Dashboard</h1>
                    <p className="opacity-70">Logged in as</p>
                    <p className="badge badge-neutral badge-lg text-sm font-mono">{user?.email}</p>
                    {user?.user_metadata?.full_name && (
                        <p className="text-lg font-semibold">{user.user_metadata.full_name}</p>
                    )}
                    {user?.user_metadata?.role && (
                        <span className="badge badge-primary">{user.user_metadata.role}</span>
                    )}
                    <div className="card-actions mt-4 w-full">
                        <button
                            onClick={handleLogout}
                            className="btn btn-error btn-outline btn-block rounded-2xl h-12"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
