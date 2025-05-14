const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Budgets extends Model {
    static init (sequelize) {
        super.init (
            {
                name: Sequelize.STRING,
                description: Sequelize.TEXT,
                user_id: Sequelize.INTEGER,
                client: Sequelize.STRING,
                estimated_value: Sequelize.DECIMAL(10, 2),
                predicted_cost: Sequelize.DECIMAL(10, 2),
                status: Sequelize.STRING,
            },
            {
                sequelize,
                timestamps: true
            }
        );
        
        return this; 
    }

    static associate(models) {
        this.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'});
    }
}

module.exports = Budgets;