var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');
const PORT = 80;

app.use(cors());
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.emit('connected', { yourTurn: true, type: 'X' });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('sendaction', () => {
        io.emit('newboard', {
            board: ['X', 'O', 'X', '', '', 'O', 'X', 'O', '']
        });
    });
});

http.listen(PORT, function() {
    console.log(`listening on *:${PORT}`);
});
