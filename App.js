"use strict";
const express    = require('express');
const reqHandler = require('./routes/RequestHandler');

var app = express();
app.use(express.static('public'));
app.get('/', reqHandler.homePage);
app.get('/search', reqHandler.search);

// Provide a port on which server will listen for http requests.
app.listen(process.env.PORT || 5000);
