const express = require('express');
const app = express();
const http = require('http');
const socket = require('socket.io');
const server = http.Server(app);
const io = socket(server);

app.use(express.static('public'));

io.on('connection', function(socket){
    socket.emit('news', "hello i am the news");
    socket.on('news1', (data) => {
        console.log(data);        
    });
});

server.listen(3000, () => {
    console.log("Http server running on port 3000");
});
