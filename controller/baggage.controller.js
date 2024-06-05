const database = require('../database');

class BaggageController {
    async createBaggage(req, res) {
        try {
            const { weight, status, passenger_id } = req.body;
            const newBaggage = await database.query('INSERT INTO baggage (weight, status, passenger_id) VALUES ($1, $2, $3) RETURNING *', [weight, status, passenger_id]);
            res.json(newBaggage.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getBaggage(req, res) {
        try {
            const baggage = await database.query('SELECT * FROM baggage');
            res.json(baggage.rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async updateBaggage(req, res) {
        try {
            const { id, weight, status, passenger_id } = req.body;
            const updatedBaggage = await database.query(
                'UPDATE baggage SET weight = $1, status = $2, passenger_id = $3 WHERE id = $4 RETURNING *',
                [weight, status, passenger_id, id]
            );
            if (updatedBaggage.rows.length > 0) {
                res.json(updatedBaggage.rows[0]);
            } else {
                res.status(404).send('Baggage not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deleteBaggage(req, res) {
        try {
            const { id } = req.params;
            const deletedBaggage = await database.query('DELETE FROM baggage WHERE id = $1 RETURNING *', [id]);
            if (deletedBaggage.rows.length > 0) {
                res.json(deletedBaggage.rows[0]);
            } else {
                res.status(404).send('Baggage not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}

module.exports = new BaggageController();
