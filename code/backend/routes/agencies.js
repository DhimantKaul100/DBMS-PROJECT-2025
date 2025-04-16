const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all government agencies
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT Agency_ID, Agency_Name, Contact_Number, Responsibilities FROM Government_Agency ORDER BY Agency_Name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching government agencies:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new government agency
router.post('/', async (req, res) => {
    const { Agency_Name, Contact_Number, Responsibilities } = req.body;

    if (!Agency_Name || !Contact_Number || !Responsibilities) {
        return res.status(400).json({ error: 'Agency Name, Contact Number, and Responsibilities are required.' });
    }

    try {
        await pool.query(
            'INSERT INTO Government_Agency (Agency_Name, Contact_Number, Responsibilities) VALUES ($1, $2, $3)',
            [Agency_Name, Contact_Number, Responsibilities]
        );
        res.status(201).json({ message: 'Agency added successfully.' });
    } catch (err) {
        console.error('Error adding agency:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET a specific agency by name
router.get('/:agency_name', async (req, res) => {
    const { agency_name } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Government_Agency WHERE Agency_Name = $1', [agency_name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching agency by name:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update) an agency
router.put('/:agency_name', async (req, res) => {
    const { agency_name } = req.params;
    const { Contact_Number, Responsibilities } = req.body;

    if (!Contact_Number || !Responsibilities) {
        return res.status(400).json({ error: 'Contact Number and Responsibilities are required.' });
    }

    try {
        const result = await pool.query(
            'UPDATE Government_Agency SET Contact_Number = $1, Responsibilities = $2 WHERE Agency_Name = $3',
            [Contact_Number, Responsibilities, agency_name]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.json({ message: 'Agency updated successfully.' });
    } catch (err) {
        console.error('Error updating agency:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE an agency
router.delete('/:agency_name', async (req, res) => {
    const { agency_name } = req.params;
    try {
        const result = await pool.query('DELETE FROM Government_Agency WHERE Agency_Name = $1', [agency_name]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.json({ message: 'Agency deleted successfully.' });
    } catch (err) {
        console.error('Error deleting agency:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
