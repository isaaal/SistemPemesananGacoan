const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Mendapatkan daftar menu
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM menu_gacoan';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan daftar menu', error: err });
        }
        res.status(200).json(results);
    });
});

// Menambahkan menu baru (Admin only)
router.post('/', (req, res) => {
    const { nama_menu, deskripsi, harga, kategori } = req.body;

    // Validasi input
    if (!nama_menu || !deskripsi || !harga || !kategori) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    const sql = 'INSERT INTO menu_gacoan (nama_menu, deskripsi, harga, kategori) VALUES (?, ?, ?, ?)';
    db.query(sql, [nama_menu, deskripsi, harga, kategori], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat menambahkan menu', error: err });
        }
        res.status(201).json({ message: 'Menu berhasil ditambahkan', id: result.insertId });
    });
});

// Mengupdate menu
router.put('/:id', (req, res) => {
    const { nama_menu, deskripsi, harga, kategori } = req.body;

    // Validasi input
    if (!nama_menu || !deskripsi || !harga || !kategori) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    const sql = 'UPDATE menu_gacoan SET nama_menu = ?, deskripsi = ?, harga = ?, kategori = ? WHERE id_menu = ?';
    db.query(sql, [nama_menu, deskripsi, harga, kategori, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mengupdate menu', error: err });
        }
        res.status(200).json({ message: 'Menu berhasil diupdate' });
    });
});

// Menghapus menu
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM menu_gacoan WHERE id_menu = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat menghapus menu', error: err });
        }
        res.status(200).json({ message: 'Menu berhasil dihapus' });
    });
});

module.exports = router;
