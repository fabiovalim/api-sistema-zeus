const Users = require('../models/Users');
const Admins = require('../models/Admins');

class AdminController {
    async create(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        // =============================================================


        const user = await Users.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist.' });
        }

        const { name, id } = user;

        const newAdmin = await Admins.create({
            user_id: id
        });

        if (!newAdmin) {
            return res.status(400).json({ message: 'Failed to create admin.' });
        }

        return res.status(200).json({ admin: name });
    }

    async delete(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        // =============================================================


        const adminToDelete = await Admins.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!adminToDelete) {
            return res.status(400).json({ message: 'Admin not exists...' });
        }

        const { user_id } = adminToDelete;

        const user = await Users.findOne({
            where: { id: user_id }
        });

        const nameAdmin = user.name;

        await Admins.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({ message: `Admin [ ${nameAdmin} ] deleted...` })
    }
};

module.exports = new AdminController();