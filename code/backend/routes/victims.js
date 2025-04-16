const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all victims
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT victim_id, Name, Age, Gender, Status, Disaster_ID, Relief_Center_ID FROM Victim ORDER BY Name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching victims:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET victims filtered by status
router.get('/status/:status', async (req, res) => {
    const { status } = req.params;
    try {
        const result = await pool.query('SELECT victim_id, Name, Age, Gender, Status, Disaster_ID, Relief_Center_ID FROM Victim WHERE Status = $1 ORDER BY Name ASC', [status]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching victims by status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new victim
router.post('/', async (req, res) => {
    const { Name, Age, Gender, Status, Disaster_ID, Relief_Center_ID } = req.body;

    if (!Name || Age === undefined || !Gender || !Status) {
        return res.status(400).json({ error: 'Name, Age, Gender, and Status are required.' });
    }

    try {
        await pool.query(
            'INSERT INTO Victim (Name, Age, Gender, Status, Disaster_ID, Relief_Center_ID) VALUES ($1, $2, $3, $4, $5, $6)',
            [Name, Age, Gender, Status, Disaster_ID || null, Relief_Center_ID || null]
        );
        res.status(201).json({ message: 'Victim added successfully.' });
    } catch (err) {
        console.error('Error adding victim:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET a specific victim by ID
router.get('/:victim_id', async (req, res) => {
    const { victim_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Victim WHERE Victim_ID = $1', [victim_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Victim not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching victim by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update) a victim
router.put('/:victim_id', async (req, res) => {
    const { victim_id } = req.params;
    const { Name, Age, Gender, Status, Disaster_ID, Relief_Center_ID } = req.body;

    if (!Name || Age === undefined || !Gender || !Status) {
        return res.status(400).json({ error: 'Name, Age, Gender, and Status are required.' });
    }

    try {
        const result = await pool.query(
            'UPDATE Victim SET Name = $1, Age = $2, Gender = $3, Status = $4, Disaster_ID = $5, Relief_Center_ID = $6 WHERE Victim_ID = $7',
            [Name, Age, Gender, Status, Disaster_ID || null, Relief_Center_ID || null, victim_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Victim not found' });
        }
        res.json({ message: 'Victim updated successfully.' });
    } catch (err) {
        console.error('Error updating victim:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE a victim
router.delete('/:victim_id', async (req, res) => {
    const { victim_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Victim WHERE Victim_ID = $1', [victim_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Victim not found' });
        }
        res.json({ message: 'Victim deleted successfully.' });
    } catch (err) {
        console.error('Error deleting victim:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


module.exports = router;
