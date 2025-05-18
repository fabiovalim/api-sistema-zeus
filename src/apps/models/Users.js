const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

class Users extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                image: Sequelize.STRING,
                position: Sequelize.STRING,
                phone:  Sequelize.STRING,
                gender: Sequelize.STRING,
                skill:  Sequelize.STRING,
                entry_date: Sequelize.DATE,
                password_hash: Sequelize.STRING,
                password: Sequelize.VIRTUAL
            },  
            {
                sequelize,
                timestamps: false
            }
        )

        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        });

        return this;
    };
    
    checkPassword(password) {
        return bcryptjs.compare(password, this.password_hash);
    };
};

module.exports = Users;