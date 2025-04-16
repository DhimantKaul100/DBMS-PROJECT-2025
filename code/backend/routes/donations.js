const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all donations
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT donation_id, Donor_Name, Amount, Purpose FROM Donation ORDER BY Date DESC');
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

// POST a new donation
router.post('/', async (req, res) => {
    const { Donor_Name, Amount, Purpose, Relief_Center_ID } = req.body;

    if (!Donor_Name || !Amount || !Purpose) {
        return res.status(400).json({ error: 'Donor Name, Amount, and Purpose are required.' });
    }

    try {
        await pool.query(
            'INSERT INTO Donation (Donor_Name, Amount, Purpose, Relief_Center_ID, Date) VALUES ($1, $2, $3, $4, NOW())',
            [Donor_Name, Amount, Purpose, Relief_Center_ID || null]
        );
        res.status(201).json({ message: 'Donation added successfully.' });
    } catch (err) {
        console.error('Error adding donation:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET a specific donation by ID
router.get('/:donation_id', async (req, res) => {
    const { donation_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Donation WHERE Donation_ID = $1', [donation_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching donation by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update) a donation
router.put('/:donation_id', async (req, res) => {
    const { donation_id } = req.params;
    const { Donor_Name, Amount, Purpose, Relief_Center_ID } = req.body;

    if (!Donor_Name || !Amount || !Purpose) {
        return res.status(400).json({ error: 'Donor Name, Amount, and Purpose are required.' });
    }

    try {
        const result = await pool.query(
            'UPDATE Donation SET Donor_Name = $1, Amount = $2, Purpose = $3, Relief_Center_ID = $4 WHERE Donation_ID = $5',
            [Donor_Name, Amount, Purpose, Relief_Center_ID || null, donation_id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json({ message: 'Donation updated successfully.' });
    } catch (err) {
        console.error('Error updating donation:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE a donation
router.delete('/:donation_id', async (req, res) => {
    const { donation_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Donation WHERE Donation_ID = $1', [donation_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.json({ message: 'Donation deleted successfully.' });
    } catch (err) {
        console.error('Error deleting donation:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
module.exports = router;
