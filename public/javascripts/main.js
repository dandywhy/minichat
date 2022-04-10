const socket = io()

let messages = document.getElementById('messages')
let form = document.getElementById('form')
let input = document.getElementById('input')

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

if (username && room) socket.emit('joinRoom', { username, room })

// Message from server
socket.on('message', msg => {
  outputMsg(msg)
  console.log(msg)
})

// Message submit
form.addEventListener('submit', e => {
  e.preventDefault()
  if (input.value) {
    socket.emit('chatMessage', input.value)
    input.value = ''
  }
})

function outputMsg(msg) {
  const li = document.createElement('li')
  const p = document.createElement('p')
  p.innerText = msg.name
  p.innerHTML += `<span> ${msg.time}</span>`
  li.appendChild(p)
  msg.content ? li.innerHTML += `${msg.content}` : 0
  messages.appendChild(li) 
  window.scrollTo(0, document.body.scrollHeight)
}


