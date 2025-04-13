const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all donations
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT Donor_Name, Amount, Purpose FROM Donation ORDER BY Date DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching donations:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
