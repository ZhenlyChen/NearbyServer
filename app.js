const Koa = require('koa')
const app = new Koa()
const service = require('./app/service')

app.use(require('koa-bodyparser')())

app.use(require('./app/router'))

app.listen(process.env.PORT || 30002)

console.log('Listen at port', 30002)

service.initService()

console.log('Service is running.')
