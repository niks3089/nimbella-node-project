'use strict';

const table = 'users';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        table, {
        email: {
          type: Sequelize.STRING(100),
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role: {
          type: Sequelize.STRING(30),
          defaultValue: 'user',
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, { transaction });
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
