const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Admins extends Model {
    static init (sequelize) {
        super.init (
            {
                user_id: Sequelize.INTEGER
            },
            {
                sequelize,
                timestamps: true,
                updatedAt: false
            }
        );
        
        return this; 
    }

    static associate(models) {
        this.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'});
    }
}

module.exports = Admins;