const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');
const socketio = require('./sockets');

require('dotenv').config({ path: './../.env' });

app.use(cors());
app.use(express.static(path.join(__dirname, 'tempclient')));

socketio.socketServer(http);

http.listen(process.env.PORT, function() {
    console.log(`listening on localhost:${process.env.PORT}`);
});
