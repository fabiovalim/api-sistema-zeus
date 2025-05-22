const { Router } = require('express');
const AdminController = require('../apps/controllers/AdminController');

const routes = Router();

routes.post('/admins/:id', AdminController.create);
routes.delete('/admins/:id', AdminController.delete);

module.exports = routes;