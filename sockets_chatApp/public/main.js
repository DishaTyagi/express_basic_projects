const socket = io();

socket.on('news', (data) => {
    console.log(data);
    socket.emit('news1', data);
});

