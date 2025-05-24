const { Router } = require('express');
const BudgetController = require('../apps/controllers/BudgetController');
const schemaValidator = require('../apps/middlewares/schemaValidator');
const BudgetSchema = require('../schema/create.budget.schema.json');

const routes = Router();

routes.get('/budgets', BudgetController.getBudget);
routes.post('/budgets', schemaValidator(BudgetSchema), BudgetController.create);
routes.put('/budgets/:id', BudgetController.update);
routes.delete('/budgets/:id', BudgetController.delete);

module.exports = routes;