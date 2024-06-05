const express = require('express')
const flightRouter = require('./routes/flight.routes')
const passengerRouter = require('./routes/passenger.routes')
const staffRouter = require('./routes/staff.routes')
const baggageRouter = require('./routes/baggage.routes')
const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api', flightRouter)
app.use('/api', passengerRouter)
app.use('/api', staffRouter)
app.use('/api', baggageRouter)

app.listen(PORT, () => console.log('server started on port 8080'))