import express, { Express, Request, Response, json } from 'express';
import http from 'http';
import { Server } from "socket.io";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server);

app.use(json())

app.post('/say_hi', (req: Request, res: Response) => {
  const { name } = req.body;

  res.json({ msg: `Hi, ${name}!` }).sendStatus(200)
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat_message', (msg) => {
    console.log('message: ' + msg);
  });
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
