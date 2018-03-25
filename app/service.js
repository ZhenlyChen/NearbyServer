const schedule = require('node-schedule')
const model = require('./model')
const MAX = 0.1
function initService () {
  schedule.scheduleJob('*/5 * * * * *', function () {
    model.refresh()
  })
}

async function getNearbyClient (ctx) {
  console.log('getNearbyClient:')
  let data = ctx.request.query // ctx.request.body
  let output = ''
  let allClient = model.getAllRecord()
  let x = parseFloat(data.x)
  let y = parseFloat(data.y)
  for (let i in allClient) {
    // console.log(allClient[i])
    // console.log(data.id, allClient[i].id, data.id === allClient[i].id)
    if (data.id === allClient[i].id) continue
    let x1 = parseFloat(allClient[i].x)
    let y1 = parseFloat(allClient[i].y)
    let dis = (x - x1) * (x - x1) + (y - y1) * (y - y1)
    console.log('dis:', dis)
    if (dis < MAX) {
      output += allClient[i].content + 'iwoqbfiasdbguiohewuiftsadf'
    }
  }
  ctx.body = output
}

async function addClient (ctx) {
  let data = ctx.request.body // ctx.request.body
  // console.log(data)
  model.addRecord({
    id: data.id,
    x: data.x,
    y: data.y,
    content: data.content
  })
  console.log('addClient:', data)
  ctx.status = 200
}

module.exports = {
  getNearbyClient: getNearbyClient,
  addClient: addClient,
  initService: initService
}
