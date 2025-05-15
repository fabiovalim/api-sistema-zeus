const Budgets = require('../models/Budgets');
const Admins = require('../models/Admins');
const Users = require('../models/Users');

class BudgetController {
    async getBudget(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        const budget = await Budgets.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!budget) {
            return res.status(400).json({ message: 'Budget not exists...' });
        }

        const { name, description, user_id, client, estimated_value, predicted_cost, status } = budget;

        return res.status(200).json({
            user_id, name, description, client, estimated_value, predicted_cost, status
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
            name,
            description,
            client,
            estimated_value,
            predicted_cost
        } = req.body;

        const verifyUser = await Users.findOne({
            where: {
                id: user_id
            }
        });

        if(!verifyUser) {
            return res.status(400).json({message: 'User not exists...'});
        };
        
        const newBudget = await Budgets.create({
            name,
            description,
            client,
            estimated_value,
            predicted_cost,
            user_id
        });

        if (!newBudget) {
            return res.status(400).json({ message: 'Created budget failed...' });
        }

        return res.status(200).json({ budget: newBudget });
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
        const { name, description, estimated_value, predicted_cost, status } = req.body;

        const verifyBudget = await Budgets.findOne({
            where: {
                id
            }
        });
        
        if(!verifyBudget) {
            return res.status(404).json({ message: 'Budget does not exists...' });
        }

        await Budgets.update (
            {   
                name: name || verifyBudget.name,
                description: description || verifyBudget.description,
                estimated_value: estimated_value || verifyBudget.estimated_value,
                predicted_cost: predicted_cost || verifyBudget.predicted_cost,
                status: status || verifyBudget.status
            },
            {
                where: {
                    id: verifyBudget.id
                }
            }
        );

        if(!Budgets.update) {
            res.status(400).json({ message: 'Failed to update this budget...' });
        }

        return res.status(200).json({ message: 'Budget updated!' });
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

        const verifyBudget = await Budgets.findOne({
            where: {
                id
            }
        });

        if(!verifyBudget) {
            return res.status(404).json({ message: 'Budget does not exists...' });
        }

        const deletedBudget = await Budgets.destroy({
            where: {
                id
            }
        });

        if(!deletedBudget) {
            return res.status(400).json({ message: 'Failed to delete this Budget...' });
        }

        return res.status(200).json({ message: 'Budget deleted...' });
    }
};

module.exports = new BudgetController();