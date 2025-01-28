const express = require('express');
const bodyParser = require('body-parser');
const pelangganRoutes = require('./controllers/pelangganController');
const pemesananRoutes = require('./controllers/pemesananController');
const detailRoutes = require('./controllers/detailcontroller');
const menuRoutes = require('./controllers/menuController');
const tempatDudukRoutes = require('./controllers/tempatDudukController');
const pembayaranRoutes = require('./controllers/pembayaranController');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/pelanggan', pelangganRoutes);
app.use('/pemesanan', pemesananRoutes);
app.use('/detail_pemesanan', detailRoutes);
app.use('/menu', menuRoutes);
app.use('/tempat_duduk', tempatDudukRoutes);
app.use('/metode_pembayaran', pembayaranRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
