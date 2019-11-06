var connected = false;
var socket = null;
var clientInfo = null;
var yourTurn = false;

document.querySelector('#game_container').style.visibility = 'hidden';

let cases = document.querySelectorAll('.case');
for (i = 0; i < cases.length; i++) {
    cases[i].addEventListener('click', function(e) {
        if (connected) {
            socket.emit('sendaction');
        }
    });
}

function connectIO() {
    if (!connected) {
        socket = io();
        socket.on('connected', function(client) {
            clientInfo = client;

            if (clientInfo.yourTurn) {
                document.querySelector('#info').innerHTML = 'Play !';
            } else {
                document.querySelector('#info').innerHTML =
                    'Waiting for other player !';
            }
        });
        socket.on('newboard', function(gameobj) {
            refreshboard(gameobj);
        });
        document.querySelector('#connect_button').innerHTML = 'Disconnect';
        connected = true;
        document.querySelector('#game_container').style.visibility = 'visible';
    } else {
        socket.disconnect();
        document.querySelector('#connect_button').innerHTML = 'Connect';
        connected = false;
        document.querySelector('#game_container').style.visibility = 'hidden';
        document.querySelector('#info').innerHTML = '';
    }
}

function refreshboard(game) {
    for (var i = 0; i < 9; ++i) {
        document.querySelector(`#case${i + 1}`).innerHTML = game.board[i];
    }
}
