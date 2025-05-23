const { Router } = require('express');
const AuthenticationMiddleware = require('../apps/middlewares/authentication');

// centralizar todas as rotas 

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const budgetRoutes = require('./budget.routes');
const penaltyRoutes = require('./penalty.routes');
const adminRoutes = require('./admin.routes');
const uploadRoutes = require('./upload.routes');

const routes = Router();

routes.get('/health', (req, res) => res.send({ message: 'Connected...' }));

routes.use(authRoutes);
routes.use(AuthenticationMiddleware); // rotas abaixo são protegidas com autenticação

routes.use(userRoutes);
routes.use(adminRoutes);
routes.use(budgetRoutes);
routes.use(penaltyRoutes);
routes.use(uploadRoutes);

module.exports = routes;