const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Menambahkan detail pemesanan (menu yang dipilih)
router.post('/', (req, res) => {
    const { id_pemesanan, id_menu, jumlah_pemesanan, total_harga } = req.body;

    // Validasi input
    if (!id_pemesanan || !id_menu || !jumlah_pemesanan || !total_harga) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    // Jika tidak ada masalah, lanjutkan dengan penambahan detail pemesanan
    const sql = 'INSERT INTO detail_pemesanan (id_pemesanan, id_menu, jumlah_pemesanan, total_harga) VALUES (?, ?, ?, ?)';
    db.query(sql, [id_pemesanan, id_menu, jumlah_pemesanan, total_harga], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat menambahkan detail pemesanan', error: err });
        }
        res.status(201).json({ message: 'Detail pemesanan berhasil ditambahkan', id: result.insertId });
    });
});

// Mendapatkan detail menu dalam satu pemesanan
router.get('/:id_pemesanan', (req, res) => {
    const sql = 'SELECT * FROM detail_pemesanan WHERE id_pemesanan = ?';
    db.query(sql, [req.params.id_pemesanan], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan detail pemesanan', error: err });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
