const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Penalties extends Model {
    static init (sequelize) {
        super.init (
            {
                description: Sequelize.TEXT,
                user_id: Sequelize.INTEGER,
                level: Sequelize.STRING,
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

module.exports = Penalties;