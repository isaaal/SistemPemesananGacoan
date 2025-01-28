const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Registrasi pelanggan baru
router.post('/register', (req, res) => {
    const { nama_pelanggan, no_whatsapp, password } = req.body;

    // Validasi input
    if (!nama_pelanggan || !no_whatsapp || !password) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    // Cek apakah no WhatsApp sudah terdaftar
    const checkSql = 'SELECT * FROM pelanggan WHERE no_whatsapp = ?';
    db.query(checkSql, [no_whatsapp], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat memeriksa no WhatsApp', error: err });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'No WhatsApp sudah terdaftar.' });
        }

        // Jika tidak ada masalah, lanjutkan dengan registrasi
        const sql = 'INSERT INTO pelanggan (nama_pelanggan, no_whatsapp, password) VALUES (?, ?, ?)';
        db.query(sql, [nama_pelanggan, no_whatsapp, password], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Kesalahan saat registrasi', error: err });
            }
            res.status(201).json({ message: 'Pelanggan berhasil terdaftar', id: result.insertId });
        });
    });
});

// Login pelanggan
router.post('/login', (req, res) => {
    const { no_whatsapp, password } = req.body;
    const sql = 'SELECT * FROM pelanggan WHERE no_whatsapp = ? AND password = ?';
    db.query(sql, [no_whatsapp, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat login', error: err });
        }
        if (results.length > 0) {
            const token = jwt.sign({ id: results[0].id_pelanggan }, 'secret_key', { expiresIn: '1h' });
            res.status(200).json({ message: 'Login berhasil', token });
        } else {
            res.status(401).json({ message: 'No WhatsApp atau password salah' });
        }
    });
});

// Mendapatkan data pelanggan (Admin only)
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM pelanggan';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan data pelanggan', error: err });
        }
        res.status(200).json(results);
    });
});

// Mendapatkan detail pelanggan tertentu
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM pelanggan WHERE id_pelanggan = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan saat mendapatkan detail pelanggan', error: err });
        }
        res.status(200).json(results[0]);
    });
});

module.exports = router;
