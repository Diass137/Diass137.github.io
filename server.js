const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

const players = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Generate a random color for the player
  const playerColor = getRandomColor();
  players[socket.id] = playerColor;

  // Send the player's color to the connected client
  socket.emit('initColor', { color: playerColor });

  // Handle square click events
  socket.on('squareClick', (data) => {
    io.emit('updateSquare', { index: data.index, color: playerColor });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Remove the player on disconnect
    delete players[socket.id];
  });
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Add the following code inside your server.js file

const playerStats = {};

// ...



