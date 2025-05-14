const Budgets = require('../models/Budgets');

class BudgetController {
    async create(req, res) {
        const {
            name,
            description,
            client,
            estimated_value,
            predicted_cost
        } = req.body;
        
        const newBudget = await Budgets.create({
            name,
            description,
            client,
            estimated_value,
            predicted_cost,
            user_id: req.params.id
        });

        if (!newBudget) {
            return res.status(400).json({ message: 'Created budget failed...' });
        }

        return res.status(200).json({ budget: newBudget });
    }
};

module.exports = new BudgetController();