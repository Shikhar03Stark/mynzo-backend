'use strict';

const {
  STRING,
  UUID,
  UUIDV4,
  DATE
} = require('sequelize/lib/data-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('city', {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      value: {
        type: STRING,
        allowNull: false,
      },
      state_id: {
        type: UUID,
        allowNull: true,
      },
      created_at: {
        type: DATE,
        allowNull: false,
      },
      updated_at: {
        type: DATE,
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('city');
  }
};