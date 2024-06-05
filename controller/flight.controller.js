const database = require('../database.js');

class FlightController {
    async createFlight(req, res) {
        const {destination, flight_number, status} = req.body
        console.log(destination, flight_number, status)
        const newFlight = await database.query('INSERT INTO flights (destination, flight_number, status) values ($1, $2, $3) RETURNING *', [destination, flight_number, status])
        res.json(newFlight.rows[0])
}

    async getFlight(req, res) {
        try {
            const flights = await database.query('SELECT * FROM flights');
            res.json(flights.rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getOneFlight(req, res) {
        try {
            const { id } = req.params;
            const flight = await database.query('SELECT * FROM flights WHERE id = $1', [id]);
            if (flight.rows.length > 0) {
                res.json(flight.rows[0]);
            } else {
                res.status(404).send('Flight not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async updateFlight(req, res) {
        try {
            const {id, destination, flight_number, status } = req.body;
            const updatedFlight = await database.query(
                'UPDATE flights SET destination = $1, flight_number = $2, status = $3 WHERE id = $4 RETURNING *',
                [destination, flight_number, status, id]
            );
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deleteFlight(req, res) {
        try {
            const { id } = req.params;
            const deletedFlight = await database.query('DELETE FROM flights WHERE id = $1 RETURNING *', [id]);
            if (deletedFlight.rows.length > 0) {
                res.json(deletedFlight.rows[0]);
            } else {
                res.status(404).send('Flight not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}

module.exports = new FlightController();
