"use strict";
const http 			= require('http');
const reqHandler 	= require('./routes/RequestHandler');

const server = http.createServer(reqHandler);
server.listen(3000);
