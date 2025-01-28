const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Mendapatkan daftar metode pembayaran
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM metode_pembayaran';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan daftar metode pembayaran', error: err });
        }
        res.status(200).json(results);
    });
});

// Menambahkan metode pembayaran baru (Admin only)
router.post('/', (req, res) => {
    const { nama_metode } = req.body;

    // Validasi input
    if (!nama_metode) {
        return res.status(400).json({ message: 'Nama metode harus diisi.' });
    }

    const sql = 'INSERT INTO metode_pembayaran (nama_metode) VALUES (?)';
    db.query(sql, [nama_metode], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat menambahkan metode pembayaran', error: err });
        }
        res.status(201).json({ message: 'Metode pembayaran berhasil ditambahkan', id: result.insertId });
    });
});

// Menghapus metode pembayaran
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM metode_pembayaran WHERE id_metode_pembayaran = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat menghapus metode pembayaran', error: err });
        }
        res.status(200).json({ message: 'Metode pembayaran berhasil dihapus' });
    });
});

module.exports = router;
