const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all disasters
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT disaster_id, disaster_type, date, location, severity_level, status FROM disaster ORDER BY date DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching disasters:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ongoing disasters
router.get('/ongoing', async (req, res) => {
    try {
        const result = await pool.query('SELECT disaster_id, disaster_type, date, location, severity_level, status FROM disaster WHERE status = $1 ORDER BY date DESC', ['Ongoing']);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching ongoing disasters:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET disasters before a specific date
router.get('/before', async (req, res) => {
    const { beforeDate } = req.query;
    if (!beforeDate) {
        return res.status(400).json({ error: 'Please provide a valid date in the "beforeDate" query parameter.' });
    }

    try {
        const result = await pool.query(
            'SELECT disaster_type, location, date FROM disaster WHERE date < $1 ORDER BY date DESC',
            [beforeDate]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching disasters before a specific date:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET number of missing victims for each disaster affected area
router.get('/missing-victims', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.disaster_id, d.disaster_type, a.area_name, 
                   COUNT(v.victim_id) AS missing_victims
            FROM disaster AS d
            LEFT JOIN affected_area AS a ON d.disaster_id = a.disaster_id
            JOIN victim AS v ON d.disaster_id = v.disaster_id
            WHERE v.status = 'Missing'
            GROUP BY d.disaster_id, d.disaster_type, a.area_name
            ORDER BY d.disaster_id;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching missing victims count:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// POST a new disaster
router.post('/', async (req, res) => {
    const { disaster_type, date, location, severity_level, description, status } = req.body;
    try {
        await pool.query(
            'INSERT INTO disaster (disaster_type, date, location, severity_level, description, status) VALUES ($1, $2, $3, $4, $5, $6)',
            [disaster_type, date, location, severity_level, description, status]
        );
        res.status(201).json({ message: 'Disaster added successfully' });
    } catch (err) {
        console.error('Error adding disaster:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a disaster
router.delete('/:disaster_id', async (req, res) => {
    const { disaster_id } = req.params;
    try {
        await pool.query('DELETE FROM disaster WHERE disaster_id = $1', [disaster_id]);
        res.json({ message: 'Disaster deleted successfully' });
    } catch (err) {
        console.error('Error deleting disaster:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update) a disaster
router.put('/:disaster_id', async (req, res) => {
    const { disaster_id } = req.params;
    const { disaster_type, date, location, severity_level, description, status } = req.body;
    try {
        await pool.query(
            'UPDATE disaster SET disaster_type = $1, date = $2, location = $3, severity_level = $4, description = $5, status = $6 WHERE disaster_id = $7',
            [disaster_type, date, location, severity_level, description, status, disaster_id]
        );
        res.json({ message: 'Disaster updated successfully' });
    } catch (err) {
        console.error('Error updating disaster:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
