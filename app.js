require('dotenv').config()
const express = require('express')
const session = require('express-session')
const formatMessage = require('./utils/messages')
const app = express()
const routes = require('./routes')
const path = require('path')
const { engine } = require('express-handlebars')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const PORT = 3000 || process.env.PORT

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// app.use(session({
//   secret: process.env.SECRET,
//   name: 'visitor',
//   saveUninitialized: false,
//   resave: false,
//   cookie: {
//     maxAge: 10 * 60 * 1000,
//     httpOnly: true
//   }
// }))

io.on('connection', socket => {
  // Welcome connected user
  socket.broadcast.emit('chatMessage', 'hi')
  socket.on('disconnect', () => {
    io.emit('chatMessage', 'user disconnected')
  })
  socket.on('chatMessage', msg => io.emit('chatMessage', msg))
})

app.use(routes)

server.listen(PORT, () => console.log(`Socket.IO running on http://localhost:${PORT}`))