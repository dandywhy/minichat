require('dotenv').config()
const express = require('express')
const session = require('express-session')
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

app.use(express.static('public'))
app.use(session({
  secret: process.env.SECRET,
  name: 'visitor',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: true
  }
}))

app.get('/', (req, res) => res.render('index'))

io.on('connection', socket => {
  socket.broadcast.emit('chat message', 'user connected')
  socket.on('disconnect', () => {
    socket.broadcast.emit('chat message', 'user disconnected')
  })
  socket.on('chat message', msg => io.emit('chat message', msg))
})

app.use(routes)

server.listen(PORT, () => console.log(`Socket.IO running on http://localhost:${PORT}`))