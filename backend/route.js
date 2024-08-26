const express = require('express');
const Service = require('./service');

const router = express.Router();

// Route pour créer un utilisateur
router.post('/createUser', async (req, res) => {
    try {
        const user = await Service.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/login', async (req, res) => {
    try {
        const user = await Service.LoginUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/createList', async (req, res) => {
    try {
        const user = await Service.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/list', async (req, res) => {
    try {
        const user = await Service.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/deletelist', async (req, res) => {
    try {
        const user = await Service.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/createTask', async (req, res) => {
    try {
        const user = await Service.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/task', async (req, res) => {
    try {
        const user = await Service.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
