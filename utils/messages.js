const dayjs = require('dayjs')

function formatMessage(name, content) {
  return {
    name,
    content,
    time: dayjs().format('HH:mm a')
  }
}

module.exports = formatMessage