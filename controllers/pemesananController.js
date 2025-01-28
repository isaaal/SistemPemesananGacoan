const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Membuat pemesanan baru
router.post('/', (req, res) => {
    const { id_pelanggan, id_tempat_duduk, tanggal_pemesanan, id_metode_pembayaran } = req.body;

    // Format tanggal_pemesanan ke format yang benar
    const formattedDate = new Date(tanggal_pemesanan).toISOString().slice(0, 19).replace('T', ' ');


    // Validasi input
    if (!id_pelanggan || !id_tempat_duduk || !tanggal_pemesanan || !id_metode_pembayaran) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    // Jika tidak ada masalah, lanjutkan dengan pembuatan pemesanan
    const sql = 'INSERT INTO pemesanan (id_pelanggan, id_tempat_duduk, tanggal_pemesanan, id_metode_pembayaran, status_pemesanan) VALUES (?, ?, ?, ?, "Pending")';

    db.query(sql, [id_pelanggan, id_tempat_duduk, formattedDate, id_metode_pembayaran], (err, result) => {

        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat membuat pemesanan', error: err });
        }
        res.status(201).json({ message: 'Pemesanan berhasil dibuat', id: result.insertId });
    });
});

// Mendapatkan daftar semua pemesanan (Admin)
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM pemesanan';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan daftar pemesanan', error: err });
        }
        res.status(200).json(results);
    });
});

// Mendapatkan detail pemesanan tertentu
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM pemesanan WHERE id_pemesanan = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan detail pemesanan', error: err });
        }
        res.status(200).json(results[0]);
    });
});

// Mengupdate status pemesanan (Admin)
router.put('/:id', (req, res) => {
    const { status_pemesanan } = req.body;
    const sql = 'UPDATE pemesanan SET status_pemesanan = ? WHERE id_pemesanan = ?';
    db.query(sql, [status_pemesanan, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mengupdate status pemesanan', error: err });
        }
        res.status(200).json({ message: 'Status pemesanan berhasil diupdate' });
    });
});

// Membatalkan pemesanan
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM pemesanan WHERE id_pemesanan = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat membatalkan pemesanan', error: err });
        }
        res.status(200).json({ message: 'Pemesanan berhasil dibatalkan' });
    });
});

module.exports = router;
