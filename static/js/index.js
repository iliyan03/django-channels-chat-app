document.querySelector('#room-name-input').focus();
document.querySelector('#room-name-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#room-name-submit').click();
    }
};

document.querySelector('#room-name-submit').onclick = function(e) {
    var roomName = document.querySelector('#room-name-input').value;
    if (roomName.length > 0){
        window.location.pathname = '/chat/' + roomName;
    } else{
        window.alert('You must type in a room name!')
    }
};
