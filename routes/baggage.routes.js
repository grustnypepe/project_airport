const Router = require('express');
const router = new Router();
const BaggageController = require('../controller/baggage.controller');

router.post('/baggage', BaggageController.createBaggage)
router.get('/baggage', BaggageController.getBaggage)
router.put('/baggage', BaggageController.updateBaggage)
router.delete('/baggage/:id', BaggageController.deleteBaggage)

module.exports = router;
