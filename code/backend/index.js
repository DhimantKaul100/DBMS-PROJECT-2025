const express = require('express');
const cors = require('cors');
require('dotenv').config();

const disastersRoutes = require('./routes/disasters');
const volunteersRoutes = require('./routes/volunteers');
const agenciesRoutes = require('./routes/agencies');
const donationsRoutes = require('./routes/donations');
const reliefCenterRoutes = require('./routes/relief-centers');
const rescueTeamRoutes = require('./routes/rescue-teams');
const victimsRoutes = require('./routes/victims');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/disasters', disastersRoutes);
app.use('/api/volunteers', volunteersRoutes);
app.use('/api/agencies', agenciesRoutes);
app.use('/api/donations', donationsRoutes);
app.use('/api/relief-centers', reliefCenterRoutes);
app.use('/api/rescue-teams', rescueTeamRoutes);
app.use('/api/victims', victimsRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
