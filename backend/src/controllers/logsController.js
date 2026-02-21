const supabase = require('../config/db');

// GET /api/logs
async function getAll(req, res) {
    const { data, error } = await supabase
        .from('logs')
        .select('*, vehicles(name, license_plate)')
        .order('date', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

// POST /api/logs
async function create(req, res) {
    const { data, error } = await supabase
        .from('logs')
        .insert(req.body)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
}

// DELETE /api/logs/:id
async function remove(req, res) {
    const { error } = await supabase
        .from('logs')
        .delete()
        .eq('id', req.params.id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
}

module.exports = { getAll, create, remove };
