import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST']
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const game = {
  players: {}
};

io.on('connection', (socket) => {
  console.log(`${socket.id} conectado.`);
  const name = 'Player_' + socket.id.substring(0, 5);
  game.players[socket.id] = { name };
  playerRefresh();

  
  socket.on('disconnect', () => {
    console.log(`${socket.id} desconectado.`);
    delete game.players[socket.id];
    playerRefresh();
  });
});

const playerRefresh = () => {
  io.emit('playerRefresh', game.players);
};

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 4000;

server.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
