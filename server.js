//require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const logEvents = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = 3500;

//custom middleware logger
app.use(logEvents);

const whitelist = ['localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//middleware for handling getting form data
app.use(express.urlencoded({ extended: false }));

// middleware for json
app.use(express.json());

//route to States
app.use('/states', require('./routes/api/states'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})



app.all('*all', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
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

//always at the end of file.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

