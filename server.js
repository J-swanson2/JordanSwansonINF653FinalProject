//require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();

const PORT = 3500;
//myEmitter.on('log', (msg) => logEvents(msg));

app.get('/', (req, res) => {
    res.send('Hello World');
})

//always at the end of file.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

