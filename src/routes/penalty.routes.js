const { Router } = require('express');
const PenaltyController = require('../apps/controllers/PenaltyController');
const schemaValidator = require('../apps/middlewares/schemaValidator');
const PenaltySchema = require('../schema/create.penalty.schema.json');

const routes = Router();

routes.get('/penalties/:id', PenaltyController.getPenalty);
routes.post('/penalties', schemaValidator(PenaltySchema), PenaltyController.create);
routes.put('/penalties/:id', PenaltyController.update);
routes.delete('/penalties/:id', PenaltyController.delete);

module.exports = routes;