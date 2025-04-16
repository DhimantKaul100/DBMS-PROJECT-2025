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

// GET a specific volunteer by ID
router.get('/:volunteer_id', async (req, res) => {
    const { volunteer_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Volunteer WHERE Volunteer_ID = $1', [volunteer_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching volunteer by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update) a volunteer
router.put('/:volunteer_id', async (req, res) => {
    const { volunteer_id } = req.params;
    const { name, skills, contact_number, availability } = req.body;

    if (!name || !skills || !contact_number || availability === undefined) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const result = await pool.query(
            'UPDATE Volunteer SET Name = $1, Skills = $2, Contact_Number = $3, Availability = $4 WHERE Volunteer_ID = $5',
            [name, skills, contact_number, availability, volunteer_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }
        res.json({ message: 'Volunteer updated successfully.' });
    } catch (err) {
        console.error('Error updating volunteer:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE a volunteer
router.delete('/:volunteer_id', async (req, res) => {
    const { volunteer_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Volunteer WHERE Volunteer_ID = $1', [volunteer_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }
        res.json({ message: 'Volunteer deleted successfully.' });
    } catch (err) {
        console.error('Error deleting volunteer:', err);
        res.status(500).json({ error: 'Internal server error.' });
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
