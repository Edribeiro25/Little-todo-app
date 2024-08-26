const express = require('express');
const Service = require('./service');

const router = express.Router();

// Route pour créer un utilisateur
router.post('/register', async (req, res) => {
    try {
        const user = await Service.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log("Login", req.body);
        const user = await Service.loginUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/addList', async (req, res) => {
    try {
        const user = await Service.createList(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/list', async (req, res) => {
    try {
        const user = await Service.updateList(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list/:id', async (req, res) => {
    try {
        console.log("Get", req.params);
        const user = await Service.getList(req.params.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/deletelist', async (req, res) => {
    try {
        console.log("Delete", req.body);
        const user = await Service.deleteList(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post('/createTask', async (req, res) => {
    try {
        const user = await Service.createTask(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/Task', async (req, res) => {
    try {
        const user = await Service.getTask(req.body);
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
