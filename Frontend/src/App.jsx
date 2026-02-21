import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}


export default App
