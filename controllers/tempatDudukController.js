const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Mendapatkan daftar tempat duduk
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM tempat_duduk';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan daftar tempat duduk', error: err });
        }
        res.status(200).json(results);
    });
});

// Menambahkan tempat duduk baru
router.post('/', (req, res) => {
    const { id_tempat_duduk, status, nomor_meja } = req.body;

    // Logging data yang diterima
    console.log('Data yang diterima untuk menambahkan tempat duduk:', req.body);

    // Validasi input
    if (!id_tempat_duduk || !status || !nomor_meja) {
        return res.status(400).json({ message: 'id_tempat_duduk, status, dan nomor meja diperlukan.' });
    }

    const sql = 'INSERT INTO tempat_duduk (id_tempat_duduk, status, nomor_meja) VALUES (?, ?, ?)';
    db.query(sql, [id_tempat_duduk, status, nomor_meja], (err, result) => {
        if (err) {
            console.error('Kesalahan saat menambahkan tempat duduk:', err);
            return res.status(500).json({ message: 'Error menambahkan tempat duduk', error: err });
        }
        res.status(201).json({ message: 'Tempat duduk berhasil ditambahkan', id: result.insertId });
    });
});

router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM tempat_duduk WHERE id_tempat_duduk = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan tempat duduk', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Tempat duduk tidak ditemukan' });
        }
        res.status(200).json(result[0]);
    });
});

// Mengupdate status tempat duduk (Admin)
router.put('/:id', (req, res) => {

    const { status } = req.body;

    // Validasi input
    if (!status) {
        return res.status(400).json({ message: 'Status harus diisi.' });
    }

    const sql = 'UPDATE tempat_duduk SET status = ? WHERE id_tempat_duduk = ?';
    db.query(sql, [status, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mengupdate status tempat duduk', error: err });
        }
        res.status(200).json({ message: 'Status tempat duduk berhasil diupdate' });
    });
});

module.exports = router;
