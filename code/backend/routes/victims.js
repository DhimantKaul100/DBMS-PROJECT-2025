const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all victims
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT Name, Age, Gender, Status, Disaster_ID, Relief_Center_ID FROM Victim ORDER BY Name ASC');
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
        const result = await pool.query('SELECT Name, Age, Gender, Status, Disaster_ID, Relief_Center_ID FROM Victim WHERE Status = $1 ORDER BY Name ASC', [status]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching victims by status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
