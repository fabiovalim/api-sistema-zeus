const Penalties = require('../models/Penalties');
const Admins = require('../models/Admins');
const Users = require('../models/Users');

class PenaltyController {
    async getPenalty(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        const penalty = await Penalties.findAll({
            attributes: ['user_id','description','level']
        });

        if (penalty.length === 0) {
            return res.status(404).json({ message: 'No penalties found...' });
        }

        return res.status(200).json(penalty);
    }

    async create(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }
        
        const {
            user_id,
            description,
            level,
        } = req.body;

        console.log('user_id: ', user_id);

        const verifyUser = await Users.findOne({
            where: {
                id: parseInt(user_id)
            }
        });

        if(!verifyUser) {
            return res.status(400).json({message: 'User not exists...'});
        };
        
        const newPenalty = await Penalties.create({
            user_id,
            description,
            level
        });

        if (!newPenalty) {
            return res.status(400).json({ message: 'Created Penalty failed...' });
        }

        return res.status(200).json({ Penalty: newPenalty });
    }

    async update(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        const { id } = req.params;
        const { description, level } = req.body;

        const verifyPenalty = await Penalties.findOne({
            where: {
                id
            }
        });
        
        if(!verifyPenalty) {
            return res.status(404).json({ message: 'Penalty does not exists...' });
        }

        await Penalties.update (
            {   
                description: description || verifyPenalty.description,
                level: level || verifyPenalty.level
            },
            {
                where: {
                    id: verifyPenalty.id
                }
            }
        );

        if(!Penalties.update) {
            res.status(400).json({ message: 'Failed to update this penalty...' });
        }

        return res.status(200).json({ message: 'Penalty updated!' });
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

        const { id } = req.params;

        const verifyPenalty = await Penalties.findOne({
            where: {
                id
            }
        });

        if(!verifyPenalty) {
            return res.status(404).json({ message: 'Penalty does not exists...' });
        }

        const deletedPenalty = await Penalties.destroy({
            where: {
                id
            }
        });

        if(!deletedPenalty) {
            return res.status(400).json({ message: 'Failed to delete this Penalty...' });
        }

        return res.status(200).json({ message: 'Penalty deleted...' });
    }
};

module.exports = new PenaltyController();