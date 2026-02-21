const supabase = require('../config/db');

// GET /api/vehicles
async function getAll(req, res) {
    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

// GET /api/vehicles/:id
async function getOne(req, res) {
    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (error) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(data);
}

// POST /api/vehicles
async function create(req, res) {
    const { data, error } = await supabase
        .from('vehicles')
        .insert(req.body)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
}

// PUT /api/vehicles/:id
async function update(req, res) {
    const { data, error } = await supabase
        .from('vehicles')
        .update(req.body)
        .eq('id', req.params.id)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
}

// DELETE /api/vehicles/:id
async function remove(req, res) {
    const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', req.params.id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };
