var connected = false;
var socket = null;
var playerInfo = null;

document.querySelector('#game_container').style.visibility = 'hidden';

let cases = document.querySelectorAll('.case');
for (i = 0; i < cases.length; i++) {
    cases[i].addEventListener('click', function(e) {
        if (connected) {
            socket.emit('sendaction', {
                case: e.currentTarget.id.substring(4),
                type: playerInfo.type,
                roomName: playerInfo.roomName
            });
        }
    });
}

function connectIO() {
    if (!connected) {
        socket = io();
        socket.on('gamestart', function(player) {
            playerInfo = player.info;

            if (playerInfo.yourTurn) {
                document.querySelector('#info').innerHTML = 'Play !';
            } else {
                document.querySelector('#info').innerHTML =
                    'Waiting for other player !';
            }
            refreshboard(player.board);
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

function refreshboard(board) {
    for (var i = 0; i < 9; ++i) {
        document.querySelector(`#case${i}`).innerHTML = board[i];
    }
}
