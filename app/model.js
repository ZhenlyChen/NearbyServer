module.exports = {
  addRecord: addRecord,
  getAllRecord: getAllRecord,
  refresh: refresh
}

let DBData = {}

function addRecord (data) {
  DBData[data.id] = {
    content: data.content,
    voice: data.voice,
    time: new Date(),
    id: data.id,
    x: data.x,
    y: data.y
  }
}

function getAllRecord () {
  return DBData
}

function refresh () {
  for (let i in DBData) {
    if ((new Date()).getTime() - DBData[i].time.getTime() > 30 * 1000) {
      console.log('Delete: ', DBData[i])
      delete DBData[i]
    }
  }
}
