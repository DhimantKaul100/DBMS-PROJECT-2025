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

// GET total donations by relief center
router.get('/relief-center-totals', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT rc.Name AS Relief_Center_Name, SUM(d.Amount) AS Total_Donations
            FROM Relief_Center rc
            JOIN Donation d ON rc.Relief_Center_ID = d.Relief_Center_ID
            GROUP BY rc.Name;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching total donations by relief center:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
