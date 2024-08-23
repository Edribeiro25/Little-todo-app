const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/list', (req, res) => {
    res.send('Hello World!');
});

app.post('/newlist', (req, res) => {
    const data = req.body; 
    res.json({ message: 'Data received', data });
});

app.patch('/list/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    res.json({ message: `Data with ID ${id} updated`, newData });
});

app.delete('/dellist/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: `Data with ID ${id} deleted` });
});

app.get('/task', (req, res) => {
    res.send('About Us');
});

app.delete('/task/:id', (req, res) => {
    res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});