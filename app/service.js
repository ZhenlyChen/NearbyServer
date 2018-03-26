const schedule = require('node-schedule')
const model = require('./model')
const SPLIT = 'iwoqbfiasdbguiohewuiftsadf'

function initService () {
  schedule.scheduleJob('*/5 * * * * *', function () {
    model.refresh()
  })
}

async function getNearbyClient (ctx) {
  let data = ctx.request.query // ctx.request.body
  console.log('getNearbyClient:' + data.voice)
  let output = ''
  let allClient = model.getAllRecord()
  for (let i in allClient) {
    // console.log(allClient[i])
    // console.log(data.id, allClient[i].id, data.id === allClient[i].id)
    if (data.id === allClient[i].id) continue
    console.log('voice:', allClient[i].voice)
    if (data.voice === allClient[i].voice) {
      output += allClient[i].content + SPLIT
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
