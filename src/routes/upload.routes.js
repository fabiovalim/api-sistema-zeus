const { Router } = require('express'); // rota para fazer o upload da imagem do usuario
const { upload } = require('../config/multer');
const FileController = require('../apps/controllers/FileController');

const routes = Router();

routes.post('/upload/:id', upload.single('image'), FileController.upload);

module.exports = routes;