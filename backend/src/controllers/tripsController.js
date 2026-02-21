const supabase = require('../config/db');

// GET /api/trips
async function getAll(req, res) {
    const { data, error } = await supabase
        .from('trips')
        .select('*, vehicles(name, license_plate), drivers(full_name)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[Supabase Error - getAllTrips]:', error);
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
}

// GET /api/trips/:id
async function getOne(req, res) {
    const { data, error } = await supabase
        .from('trips')
        .select('*, vehicles(name, license_plate), drivers(full_name)')
        .eq('id', req.params.id)
        .single();

    if (error) return res.status(404).json({ error: 'Trip not found' });
    res.json(data);
}

// POST /api/trips
async function create(req, res) {
    const { vehicle_id, cargo_weight_kg } = req.body;

    // Check vehicle exists and is available
    const { data: vehicle, error: vErr } = await supabase
        .from('vehicles')
        .select('max_capacity_kg, status')
        .eq('id', vehicle_id)
        .single();

    if (vErr || !vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    if (vehicle.status !== 'Available') return res.status(400).json({ error: `Vehicle is currently "${vehicle.status}"` });
    if (cargo_weight_kg > vehicle.max_capacity_kg) {
        return res.status(400).json({ error: `Cargo (${cargo_weight_kg} kg) exceeds capacity (${vehicle.max_capacity_kg} kg)` });
    }

    const { data, error } = await supabase
        .from('trips')
        .insert(req.body)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });

    // Mark vehicle as On Trip
    await supabase.from('vehicles').update({ status: 'On Trip' }).eq('id', vehicle_id);

    res.status(201).json(data);
}

// PUT /api/trips/:id
async function update(req, res) {
    const { data, error } = await supabase
        .from('trips')
        .update(req.body)
        .eq('id', req.params.id)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });

    // Free up vehicle when trip ends
    if (req.body.status === 'Completed' || req.body.status === 'Cancelled') {
        await supabase.from('vehicles').update({ status: 'Available' }).eq('id', data.vehicle_id);
    }

    res.json(data);
}

// DELETE /api/trips/:id
async function remove(req, res) {
    const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', req.params.id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };
