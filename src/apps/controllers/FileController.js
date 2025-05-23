const Admins = require('../models/Admins');
const Users = require('../models/Users');

class FileController {
    async upload(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        const { filename } = req.file;

        const user = await Users.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!user) {
            return res.status(400).json({ message: 'User not exists...' });
        }

        await Users.update (
            {
                image: filename || user.image,
            },
            {
                where: {
                    id: user.id
                }
            }
        );

        return res.status(200).json({ url: `uploads/${filename}` });
    }
}

module.exports = new FileController();