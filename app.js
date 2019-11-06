var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');
var queue = [];
var roomsInfo = [];
const PORT = 80;

app.use(cors());
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('a user connected');
    if (queue.length > 0) {
        const roomName = uuidGenerator();
        let otherplayer = queue.pop();
        socket.join(roomName);
        otherplayer.join(roomName);
        var playersArray = [];

        playersArray.push({
            socket: socket,
            info: { yourTurn: true, type: 'X', roomName }
        });
        playersArray.push({
            socket: otherplayer,
            info: { yourTurn: false, type: 'O', roomName }
        });
        roomsInfo[roomName] = {
            board: ['', '', '', '', '', '', '', '', ''],
            players: playersArray
        };

        sendInfoBoth(roomName);
    } else {
        queue.push(socket);
    }

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('sendaction', action => {
        let game = roomsInfo[action.roomName];
        console.log(game.board);
        console.log(action.case);
        console.log(game.board[action.case]);
        console.log(action.type);
        game.board[action.case] = action.type;

        console.log(game.board);
        console.log(game.board[action.case]);
        console.log(action.type);
        game.players.forEach(player => {
            player.info.yourTurn = !player.info.yourTurn;
        });

        sendInfoBoth(action.roomName);
    });
});

http.listen(PORT, function() {
    console.log(`listening on *:${PORT}`);
});

function uuidGenerator() {
    return 'xxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function sendInfoBoth(roomName) {
    let game = roomsInfo[roomName];
    game.players.forEach(player => {
        player.socket.emit('gamestart', {
            board: game.board,
            info: player.info
        });
    });
}
