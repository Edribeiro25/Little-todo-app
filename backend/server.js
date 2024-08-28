const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Routes = require('./route');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use('/api', Routes);
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

