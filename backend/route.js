const express = require('express');
const Service = require('./service');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route pour créer un utilisateur
router.post('/register', async (req, res) => {
    try {
        const user = await Service.createUser(req.body);
        const token = jwt.sign(user, secretKey,  { expiresIn: '1h' });
        res.status(201).json({ token,id : user.id });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await Service.loginUser(req.body);
        const token = jwt.sign(user, secretKey,  { expiresIn: '1h' });
        res.status(201).json({ token,id : user.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const secretKey = 'SECRET_KEY_FOR_THIS_TEST';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }
    try {
      req.user = jwt.verify(token, secretKey);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};

router.get('/me',verifyToken  ,async (req, res) => {
    try {
        user = jwt.verify(req.headers.authorization.split(' ')[1], secretKey);
        res.status(201).json({ id : user.id ,firstname : user.name ,lastname : user.lastname ,email : user.email});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/addlist',verifyToken,async (req, res) => {
    try {
        const user = await Service.createList(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/list',verifyToken , async (req, res) => {
    try {
        const user = await Service.updateList(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list/:id',verifyToken , async (req, res) => {
    try {
        const list = await Service.getList(req.params.id);
        res.status(201).json(list);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/deletelist/:id', async (req, res) => {
    try {
        const user = await Service.deleteList(req.params.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post('/createTask',verifyToken , async (req, res) => {
    try {
        const user = await Service.createTask(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/task/:id',verifyToken , async (req, res) => {
    try {
        const user = await Service.getTask(req.params.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/task:id',verifyToken ,async (req, res) => {
    try {
        const user = await Service.deleteTask(req.params.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
