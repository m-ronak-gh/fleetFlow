const supabase = require('../config/db');

// GET /api/drivers
async function getAll(req, res) {
    const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

// GET /api/drivers/:id
async function getOne(req, res) {
    const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (error) return res.status(404).json({ error: 'Driver not found' });
    res.json(data);
}

// POST /api/drivers
async function create(req, res) {
    const { data, error } = await supabase
        .from('drivers')
        .insert(req.body)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
}

// PUT /api/drivers/:id
async function update(req, res) {
    const { data, error } = await supabase
        .from('drivers')
        .update(req.body)
        .eq('id', req.params.id)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
}

// DELETE /api/drivers/:id
async function remove(req, res) {
    const { error } = await supabase
        .from('drivers')
        .delete()
        .eq('id', req.params.id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };
