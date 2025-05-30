require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const logEvents = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

//custom middleware logger
app.use(logEvents);

app.use(cors());

//middleware for handling getting form data
app.use(express.urlencoded({ extended: false }));

// middleware for json
app.use(express.json());

//route to States
app.use('/states', require('./routes/api/statesData'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.all('*all', (req, res) => {
    res.status(404);
    if (req.accepts('text/html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    }
    else {
        res.type('txt').send("404 Not Found");
    }
})

//custom error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})


