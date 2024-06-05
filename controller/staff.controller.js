const database = require('../database');

class StaffController {
    async createStaff(req, res) {
        try {
            const { name, position, flight_id } = req.body;
            const newStaff = await database.query('INSERT INTO staff (name, position, flight_id) VALUES ($1, $2, $3) RETURNING *', [name, position, flight_id]);
            res.json(newStaff.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getStaff(req, res) {
        try {
            const staff = await database.query('SELECT * FROM staff');
            res.json(staff.rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deleteStaff(req, res) {
        try {
            const { id } = req.params;
            const deletedStaff = await database.query('DELETE FROM staff WHERE id = $1 RETURNING *', [id]);
            if (deletedStaff.rows.length > 0) {
                res.json(deletedStaff.rows[0]);
            } else {
                res.status(404).send('Staff not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}

module.exports = new StaffController();
