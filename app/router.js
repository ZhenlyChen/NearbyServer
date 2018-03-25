const Router = require('koa-router')
const service = require('./service')
const router = new Router()

router.get('/getNearbyClient/', service.getNearbyClient)
router.post('/addClient/', service.addClient)
module.exports = router.routes()
