const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Routes = require('./route');


app.use(express.json());
app.use('/api', Routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

