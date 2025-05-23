const multer = require('multer'); // upload da foto do usuario
const { v4 } = require('uuid');

const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename(req, file, callback) {
            const filename = `${v4()}-${file.originalname}`;
            return callback(null, filename);
        }
    })
});

module.exports = { upload };