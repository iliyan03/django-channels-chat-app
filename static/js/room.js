const roomName = JSON.parse(document.getElementById('room-name').textContent);

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/'
    + roomName
    + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    /* Create message */
    const message_element = document.createElement('div');
    if (username === data.username ){
        message_element.classList.add('message', 'yours');
    } else{
        message_element.classList.add('message');
    }
    
    const username_content = document.createElement('div');
    username_content.classList.add('d-flex');

    /* User element */
    const username_element = document.createElement('b');
    username_element.textContent = data.username;
    username_element.classList.add('username');

    /* Message content element */
    const content_element = document.createElement('p');
    content_element.textContent = data.message;
    content_element.classList.add('content');
    
    /* Created */
    const created = document.createElement('div');
    created.classList.add('created');

    var dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false};
    var datetime = new Date(data.timestamp).toLocaleString('en', dateOptions);

    created.textContent = datetime;

    /* Append to message element */
    document.querySelector('#messages').appendChild(message_element);
    message_element.appendChild(username_content);
    username_content.appendChild(content_element);
    username_content.appendChild(username_element);
    message_element.appendChild(created);
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    if (message.length == 0){
        messageInputDom.placeholder = "Please type in something before sending!"
        window.alert('Type in a message first!')
        return false
    } else{
        messageInputDom.placeholder = "Message";
    }
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};
