const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all relief centers
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT Name, Location FROM Relief_Center ORDER BY Name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching relief centers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
