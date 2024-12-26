'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "in-active"),
        allownull: true,
        defaultValue: "active",
      },
      is_active: {
        type: Sequelize.TINYINT,
        comment: "0=false,1=true",
        defaultValue: 0,
      },
      fees: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE(),
        defaultValue: new Date(),
      },
      deleted_at: {
        type: Sequelize.DATE(),
      },
      refresh_token: {
        type: Sequelize.TEXT(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
