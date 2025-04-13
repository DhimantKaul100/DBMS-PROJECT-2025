const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all rescue teams
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT Team_Name, Specialization, Contact_Number, Status FROM Rescue_Team ORDER BY Team_Name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching rescue teams:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET teams working in specified areas (case-insensitive)
router.get('/working-areas', async (req, res) => {
    const { locations } = req.query;

    if (!locations) {
        return res.status(400).json({ error: 'Please provide locations as a comma-separated list.' });
    }

    const locationsArray = locations.split(',').map(loc => loc.trim().toLowerCase()); // Convert input to lowercase

    try {
        const result = await pool.query(`
            SELECT r.team_id, r.team_name, r.specialization, d.location
            FROM rescue_team AS r
            JOIN disaster_assigned_teams AS da ON r.team_id = da.team_id
            JOIN disaster AS d ON da.disaster_id = d.disaster_id
            WHERE LOWER(d.location) = ANY($1)
        `, [locationsArray]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching teams by working areas:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET rescue teams filtered by status
router.get('/status/:status', async (req, res) => {
    const { status } = req.params;
    try {
        const result = await pool.query('SELECT Team_Name, Specialization, Contact_Number, Status FROM Rescue_Team WHERE Status = $1 ORDER BY Team_Name ASC', [status]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching rescue teams by status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
