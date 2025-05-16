const { Router } = require('express');
const UserController = require('../apps/controllers/UserController');
const BudgetController = require('../apps/controllers/BudgetController');
const AdminController = require('../apps/controllers/AdminController');
const PenaltyController = require('../apps/controllers/PenaltyController');

const AuthenticationMiddleware = require('../apps/middlewares/authentication');
const AuthenticationController = require('../apps/controllers/AuthenticationController');

const schemaValidator = require('../apps/middlewares/schemaValidator');
const UserSchema = require('../schema/create.user.schema.json');
const BudgetSchema = require('../schema/create.budget.schema.json');
const AuthSchema = require('../schema/auth.schema.json');
const PenaltySchema = require('../schema/create.penalty.schema.json');

const routes = new Router();

routes.get('/health', (req, res) => {return res.send({ message: 'Connected...' })});
routes.post('/auth', schemaValidator(AuthSchema), AuthenticationController.authenticate);

routes.use(AuthenticationMiddleware);

routes.get('/user/:id', UserController.getUser);
routes.post('/user', schemaValidator(UserSchema), UserController.create);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

routes.get('/budgets/:id', BudgetController.getBudget);
routes.post('/budgets/:id', schemaValidator(BudgetSchema), BudgetController.create);
routes.put('/budgets/:id', BudgetController.update);
routes.delete('/budgets/:id', BudgetController.delete);

routes.get('/penalties/:id', PenaltyController.getPenalty);
routes.post('/penalties', schemaValidator(PenaltySchema), PenaltyController.create);
routes.put('/penalties/:id', PenaltyController.update);
routes.delete('/penalties/:id', PenaltyController.delete);

routes.post('/admins/:id', AdminController.create);
routes.delete('/admins/:id', AdminController.delete);

module.exports = routes;