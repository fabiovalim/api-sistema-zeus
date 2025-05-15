const bcryptjs = require('bcryptjs');
const Users = require('../models/Users');
const Admins = require('../models/Admins');

class UserController {
    async getUser(req, res) {
        //==============================================================
        //                     VERIFY ADMIN

        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        // =============================================================

        const user = await Users.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!user) {
            return res.status(400).json({ message: 'User not exists...' });
        }

        const { name, email, position, phone } = user;

        return res.status(200).json({
            name, email, phone, position 
        });
    }

    async create(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        // =============================================================

        const verifyUser = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        if(verifyUser) {
            return res.status(400).json({message: 'User already exists!'});
        };

        const user = await Users.create(req.body);
        
        if(!user) {
            return res.status(400).json({message: 'Failed to create a user!'});
        }

        return res.send({ message: 'User created with sucess!' });
    };

    async update(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        const {
            name,
            entry_date,
            image,
            gender,
            phone,
            skill,
            old_password,
            new_password,
            confirm_new_password
        } = req.body;

        const user = await Users.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!user) {
            return res.status(400).json({ message: 'User not exists...' });
        }

        let encryptedPassword = '';

        if(old_password) {
            if(!await user.checkPassword(old_password)) {
                return res.status(401).json({ error: 'Old password does not match...' });
            }

            if(!new_password || !confirm_new_password) {
                return res.status(401).json({
                    error: 'We need a new password and confirm new_password attributes...' 
                });
            }

            if(new_password !== confirm_new_password) {
                return res.status(401).json({
                    error: 'New password and confirm new password does not match...'
                });
            }

            encryptedPassword = await bcryptjs.hash(new_password, 8); 
        }

        await Users.update (
            {
                name: name || user.name,
                entry_date: entry_date || user.entry_date,
                gender: gender || user.gender,
                image: image || user.image,
                phone: phone || user.phone,
                skill: skill || user.skill,
                password_hash: encryptedPassword || user.password_hash
            },
            {
                where: {
                    id: user.id
                }
            }
        );

        return res.status(200).json({ message: 'User updated...' });
    }

    async delete(req, res) {
        const verifyAdmin = await Admins.findOne({
            where: {
                user_id: req.userId
            }
        });

        if(!verifyAdmin) {
            return res.status(401).json({ message: `You don't have permission...` });
        }

        const userToDelete = await Users.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!userToDelete) {
            return res.status(400).json({ message: 'User not exists...' });
        }

        const nameUser = userToDelete.name;

        await Users.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({ message: `User [ ${nameUser} ] deleted...` })
    }
};

module.exports = new UserController();