const express = require('express');
const cors = require('cors');
require('dotenv').config();

const rateLimiter = require('./middleware/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const vehiclesRoutes = require('./routes/vehiclesRoutes');
const driversRoutes = require('./routes/driversRoutes');
const tripsRoutes = require('./routes/tripsRoutes');
const logsRoutes = require('./routes/logsRoutes');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/logs', logsRoutes);

// Root
app.get('/', (req, res) => {
    res.json({ message: 'FleetFlow API is running' });
});

// Start
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
});
