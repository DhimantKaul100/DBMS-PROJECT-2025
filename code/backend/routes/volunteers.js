const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all volunteers
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT Volunteer_ID, Name, Skills, Contact_Number, Availability FROM Volunteer ORDER BY Name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching volunteers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET volunteers filtered by availability
router.get('/availability/:availability', async (req, res) => {
    const { availability } = req.params;
    const availabilityBool = (availability === 'true'); // Convert string to boolean

    try {
        const result = await pool.query(
            'SELECT Volunteer_ID, Name, Skills, Contact_Number, Availability FROM Volunteer WHERE Availability = $1 ORDER BY Name ASC',
            [availabilityBool]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching volunteers by availability:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// GET volunteers in active rescue teams
router.get('/active-rescue-team', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT v.volunteer_id, v.name 
            FROM volunteer AS v
            JOIN volunteer_rescue_team AS vr ON v.volunteer_id = vr.volunteer_id
            JOIN rescue_team AS r ON vr.team_id = r.team_id
            WHERE r.status = 'Active'
            ORDER BY v.volunteer_id;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching volunteers in active rescue teams:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// POST a new volunteer
router.post('/', async (req, res) => {
    const { Name, Skills, Contact_Number, Availability } = req.body;
    try {
        await pool.query(
            'INSERT INTO Volunteer (Name, Skills, Contact_Number, Availability) VALUES ($1, $2, $3, $4)',
            [Name, Skills, Contact_Number, Availability]
        );
        res.status(201).json({ message: 'Volunteer added successfully' });
    } catch (err) {
        console.error('Error adding volunteer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
