const database = require('../database');

class PassengerController {
    async getPassenger(req, res) {
        try {
            const { flight_id } = req.query;
            const passengers = await database.query('SELECT * FROM passengers WHERE flight_id = $1', [flight_id]);
            res.json(passengers.rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async createPassenger(req, res) {
        try {
            const { name, passport_number, flight_id } = req.body;
            const newPassenger = await database.query(
                'INSERT INTO passengers (name, passport_number, flight_id) VALUES ($1, $2, $3) RETURNING *',
                [name, passport_number, flight_id]
            );
            res.json(newPassenger.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getOnePassenger(req, res) {
        try {
            const { id } = req.params;
            const passenger = await database.query('SELECT * FROM passengers WHERE id = $1', [id]);
            if (passenger.rows.length > 0) {
                res.json(passenger.rows[0]);
            } else {
                res.status(404).send('Passenger not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deletePassenger(req, res) {
        try {
            const { id } = req.params;
            const deletedPassenger = await database.query('DELETE FROM passengers WHERE id = $1 RETURNING *', [id]);
            if (deletedPassenger.rows.length > 0) {
                res.json(deletedPassenger.rows[0]);
            } else {
                res.status(404).send('Passenger not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}

module.exports = new PassengerController();
