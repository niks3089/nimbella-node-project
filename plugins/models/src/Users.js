const { Model } = require('sequelize');

class Users extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(50),
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        role: {
          type: DataTypes.STRING(30),
          defaultValue: 'user',
          allowNull: false,
          validate: {
            allowedRole(value) {
              if (value !== 'user' && value !== 'admin') {
                throw new Error(`Unknown role: \`${value}\``);
              }
            }
          }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'users'
      }
    );
  }
  static associate({ Projects }) {
    Users.Project = this.hasMany(Projects, { foreignKey: 'user' });
  }
}

module.exports = Users;
