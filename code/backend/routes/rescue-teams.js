const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all rescue teams
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT Team_ID, Team_Name, Specialization, Contact_Number, Status FROM Rescue_Team ORDER BY Team_Name ASC');
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
        const result = await pool.query('SELECT Team_ID, Team_Name, Specialization, Contact_Number, Status FROM Rescue_Team WHERE Status = $1 ORDER BY Team_Name ASC', [status]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching rescue teams by status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET a specific rescue team by ID
router.get('/:team_id', async (req, res) => {
    const { team_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Rescue_Team WHERE Team_ID = $1', [team_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Rescue team not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching rescue team by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update) a rescue team
router.put('/:team_id', async (req, res) => {
    const { team_id } = req.params;
    const { team_name, specialization, contact_number, status } = req.body;

    if (!team_name || !specialization || !contact_number || !status) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const result = await pool.query(
            'UPDATE Rescue_Team SET Team_Name = $1, Specialization = $2, Contact_Number = $3, Status = $4 WHERE Team_ID = $5',
            [team_name, specialization, contact_number, status, team_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Rescue team not found' });
        }
        res.json({ message: 'Rescue team updated successfully.' });
    } catch (err) {
        console.error('Error updating rescue team:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


// POST a new rescue team
router.post('/', async (req, res) => {
    const { team_name, specialization, contact_number, status } = req.body;

    if (!team_name || !specialization || !contact_number || !status) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        await pool.query(
            'INSERT INTO Rescue_Team (Team_Name, Specialization, Contact_Number, Status) VALUES ($1, $2, $3, $4)',
            [team_name, specialization, contact_number, status]
        );
        res.status(201).json({ message: 'Rescue team added successfully.' });
    } catch (err) {
        console.error('Error adding rescue team:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE a rescue team
router.delete('/:team_id', async (req, res) => {
    const { team_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Rescue_Team WHERE Team_ID = $1', [team_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Rescue team not found' });
        }
        res.json({ message: 'Rescue team deleted successfully.' });
    } catch (err) {
        console.error('Error deleting rescue team:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
