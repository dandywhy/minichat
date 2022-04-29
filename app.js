require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')
const { engine } = require('express-handlebars')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { cors: { origin: '*' } })
const port = process.env.PORT || 3000

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

io.on('connection', socket => {
  const events = require('./utils/events')(io, socket)
  
  socket.on('joinRoom', ({ username, room }) => events.joinChatroom(username, room))
  socket.on('chatMessage', msg => events.chatMessage(msg))
  socket.on('disconnect', events.disconnect)
})

app.use(routes)

server.listen(port, () => console.log(`MiniChat is running on http://localhost:${port}`))