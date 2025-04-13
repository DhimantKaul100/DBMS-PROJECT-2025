const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all government agencies
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT Agency_Name, Contact_Number, Responsibilities FROM Government_Agency ORDER BY Agency_Name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching government agencies:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
