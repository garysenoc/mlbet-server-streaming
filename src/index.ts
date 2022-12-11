import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { roomHandler } from './room';

const app = express();
app.use(cors);
const port = 8080;
const server = http.createServer(app);

// eslint-disable-next-line no-use-before-define
app.route('/get').get((req, res) => {
  const re = req.query.params;
  console.log(re);
  res.send('hello');
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  roomHandler(socket);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

