const path = require('path');
const http = require('http');
const express = require('express');
const ejs = require('ejs');   
const bodyparser = require('body-parser');
const mysql = require('mysql');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

// getInfo;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Chat Bot
const botName = 'Chat Bot';

// View Rngine
app.set('view engine', ejs);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));

// Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'schoolDB'
})

connection.connect(function(error){
  if(!!error) console.log(error);
  else console.log('Database Connected!')
})

// Define path
app.get('/', (req, res) => {
  let sql = 'SELECT * FROM student';
  let query = connection.query(sql, (err, rows) => {
    if(err) throw err; 
    res.render('admin-student', {
      // title: 'CRUD',
      user: rows
    });
  })
})

// Run when a client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to the Group Chat'));

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    
    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  })

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
      
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    };

  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));