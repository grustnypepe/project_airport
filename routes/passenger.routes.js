const Router = require('express')
const router = new Router()
const PassengerController = require('../controller/passenger.controller')

router.post('/passenger', PassengerController.createPassenger)
router.get('/passenger', PassengerController.getPassenger)
router.get('/passenger/:id', PassengerController.getOnePassenger)
router.delete('/passenger/:id', PassengerController.deletePassenger)

module.exports = router