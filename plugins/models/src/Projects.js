const { Model } = require('sequelize');

class Projects extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(500)
        },
        user: {
          type: DataTypes.STRING(50),
          allowNull: false,
          foreignKey: 'email'
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'projects'
      }
    );
  }
  static associate({ Users }) {
    Projects.User = this.belongsTo(Users, { foreignKey: 'user' });
  }
}

module.exports = Projects;
