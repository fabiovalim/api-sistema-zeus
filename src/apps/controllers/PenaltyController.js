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

        const penalty = await Penalties.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!penalty) {
            return res.status(400).json({ message: 'Penalty not exists...' });
        }

        const user = await Users.findOne({
            where: {
                id: penalty.user_id 
            }
        });

        const { name } = user;

        const { description, level } = penalty;

        return res.status(200).json({
            name, description, level
        });
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
};

module.exports = new PenaltyController();