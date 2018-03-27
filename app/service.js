const schedule = require('node-schedule')
const model = require('./model')
const SPLIT = 'iwoqbfiasdbguiohewuiftsadf'
const MAX = 0.1
function initService () {
  schedule.scheduleJob('*/10 * * * * *', function () {
    model.refresh()
  })
}

async function getNearbyClient (ctx) {
  let data = ctx.request.query // ctx.request.body
  console.log('getNearbyClient:\nvoice: ', data.voice, ',x: ', data.x, ',y: ', data.y)
  let output = ''
  let allClient = model.getAllRecord()
  for (let i in allClient) {
    if (data.id === allClient[i].id) continue
    if (data.voice !== '0') {
      console.log('voice:', allClient[i].voice)
      if (data.voice === allClient[i].voice) {
        output += allClient[i].content + SPLIT
      }
    } else {
      // console.log(allClient[i])
      let x = parseFloat(data.x)
      let y = parseFloat(data.y)
      let x1 = parseFloat(allClient[i].x)
      let y1 = parseFloat(allClient[i].y)
      let dis = (x - x1) * (x - x1) + (y - y1) * (y - y1)
      // console.log(x, y, x1, y1)
      console.log('dis:', dis)
      if (dis < MAX) {
        output += allClient[i].content + SPLIT
      }
    }
  }
  ctx.body = output
}

async function addClient (ctx) {
  let data = ctx.request.body // ctx.request.body
  // console.log(data)
  model.addRecord({
    id: data.id,
    voice: data.voice,
    x: data.x,
    y: data.y,
    content: data.content
  })
  console.log('addClient:\n', data)
  ctx.status = 200
}

module.exports = {
  getNearbyClient: getNearbyClient,
  addClient: addClient,
  initService: initService
}
