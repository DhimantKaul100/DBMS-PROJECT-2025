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

module.exports = router;
