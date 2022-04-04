const express = require('express')
const app = express()
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

app.get('/', (req, res) => res.render('index'))

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => console.log('user disconnected'))
})

server.listen(PORT, () => console.log(`Socket.IO running on http://localhost:${PORT}`))