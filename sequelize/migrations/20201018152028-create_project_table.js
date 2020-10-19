'use strict';

const table = 'projects';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        table, {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        description: {
          type: Sequelize.STRING(500),
          allowNull: false
        },
        user: {
          type: Sequelize.STRING(50),
          allowNull: false,
          foreignKey: 'email'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction });

      await queryInterface.addConstraint(table, {
        fields: ['user'],
        type: 'FOREIGN KEY',
        name: `projectUserFK`,
        onDelete: 'cascade',
        references: {
          table: 'users',
          field: 'email'
        },
        transaction
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    return queryInterface.dropTable(table);
  }
};
