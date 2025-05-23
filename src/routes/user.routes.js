const { Router } = require('express');
const UserController = require('../apps/controllers/UserController');
const schemaValidator = require('../apps/middlewares/schemaValidator');
const UserSchema = require('../schema/create.user.schema.json');

const routes = Router();

routes.get('/user', UserController.getUser);
routes.post('/user', schemaValidator(UserSchema), UserController.create);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;