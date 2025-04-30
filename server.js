//require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const logEvents = require('./middleware/logEvents');
const PORT = 3500;

//custom middleware logger
app.use(logEvents);

//middleware for handling getting form data
app.use(express.urlencoded({ extended: false }));

// middleware for json
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/*all', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

//always at the end of file.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

