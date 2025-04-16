const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all relief centers
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT  Relief_Center_ID, Name, Location, Capacity FROM Relief_Center ORDER BY Name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching relief centers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new relief center
router.post('/', async (req, res) => {
    const { Name, Location, Capacity, Available_Resources } = req.body;

    if (!Name || !Location || !Capacity) {
        return res.status(400).json({ error: 'Name, Location, and Capacity are required.' });
    }

    try {
        await pool.query(
            'INSERT INTO Relief_Center (Name, Location, Capacity, Available_Resources) VALUES ($1, $2, $3, $4)',
            [Name, Location, Capacity, Available_Resources || null]
        );
        res.status(201).json({ message: 'Relief center added successfully.' });
    } catch (err) {
        console.error('Error adding relief center:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
// GET a specific relief center by ID
router.get('/:relief_center_id', async (req, res) => {
    const { relief_center_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Relief_Center WHERE Relief_Center_ID = $1', [relief_center_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Relief center not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching relief center by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update) a relief center
router.put('/:relief_center_id', async (req, res) => {
    const { relief_center_id } = req.params;
    const { Name, Location, Capacity, Available_Resources } = req.body;

    if (!Name || !Location || !Capacity) {
        return res.status(400).json({ error: 'Name, Location, and Capacity are required.' });
    }

    try {
        const result = await pool.query(
            'UPDATE Relief_Center SET Name = $1, Location = $2, Capacity = $3, Available_Resources = $4 WHERE Relief_Center_ID = $5',
            [Name, Location, Capacity, Available_Resources || null, relief_center_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Relief center not found' });
        }
        res.json({ message: 'Relief center updated successfully.' });
    } catch (err) {
        console.error('Error updating relief center:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE a relief center
router.delete('/:relief_center_id', async (req, res) => {
    const { relief_center_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Relief_Center WHERE Relief_Center_ID = $1', [relief_center_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Relief center not found' });
        }
        res.json({ message: 'Relief center deleted successfully.' });
    } catch (err) {
        console.error('Error deleting relief center:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
