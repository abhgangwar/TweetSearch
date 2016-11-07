"use strict";
const http          = require('http');
const reqHandler    = require('./routes/RequestHandler');

// Create a server
const server = http.createServer(reqHandler);

// Provide a port on which server will listen for http requests.
server.listen(3000);
