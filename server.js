const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const app = express();
const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();

const PORT = 3500;
//myEmitter.on('log', (msg) => logEvents(msg));

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    //myEmitter.emit('log', req.url, req.method);

    //const extension = path.extname(req.url);

    //let contentType;


});

//always at the end of file.
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

