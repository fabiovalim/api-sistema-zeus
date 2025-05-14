const { Router } = require('express');
const UserController = require('../apps/controllers/UserController');
const BudgetController = require('../apps/controllers/BudgetController');
const schemaValidator = require('../apps/middlewares/schemaValidator');
const UserSchema = require('../schema/create.user.schema.json');
const BudgetSchema = require('../schema/create.budget.schema.json');

const routes = new Router();

routes.get('/health', (req, res) => {return res.send({ message: 'Connected...' })});

routes.get('/user/:id', UserController.getUser);
routes.post('/user', schemaValidator(UserSchema), UserController.create);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

routes.post('/budgets/:id', schemaValidator(BudgetSchema), BudgetController.create);

module.exports = routes;