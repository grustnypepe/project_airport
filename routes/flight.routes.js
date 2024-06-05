const Router = require('express')
const router = new Router()
const FlightController = require('../controller/flight.controller')

router.post('/flight', FlightController.createFlight)
router.get('/flight', FlightController.getFlight)
router.get('/flight/:id', FlightController.getOneFlight)
router.put('/flight', FlightController.updateFlight)
router.delete('/flight/:id', FlightController.deleteFlight)

module.exports = router
