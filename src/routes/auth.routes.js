const { Router } = require('express');
const AuthenticationController = require('../apps/controllers/AuthenticationController');
const schemaValidator = require('../apps/middlewares/schemaValidator');
const AuthSchema = require('../schema/auth.schema.json');

const routes = Router();

routes.post('/auth', schemaValidator(AuthSchema), AuthenticationController.authenticate);

module.exports = routes;