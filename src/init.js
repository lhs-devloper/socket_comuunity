import express from "express";
import http from 'http';
import { Server } from "socket.io";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app)
const port = process.env.PORT || 4000;
const io = new Server(server);

app.set('port', process.env.PORT || 4000)
app.use("/public", express.static(__dirname + "/public"))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`listening on *:${app.get('port')}`);
});