const { userJoin, getCurrentUser, userLeave } = require('../utils/users')
const formatMessage = require('../utils/messages')

module.exports = (io, socket) => {
  const joinChatroom = (username, room) => {
    userJoin(socket.id, username, room)
    
    socket.join(room)
  
    socket.broadcast.to(room).emit('message', formatMessage(`${username} 已加入`))
  }
  
  const chatMessage = msg => {
    const { username, room } = getCurrentUser(socket.id)

    io.to(room).emit('message', formatMessage(username, msg))
  }

  const disconnect = () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit('message', formatMessage(`${user.username} 已離開`))
    }
  }

  return {
    joinChatroom,
    chatMessage,
    disconnect
  }
}



