const Sequelize = require('sequelize');
const sequelize   = require("../../../../database/index");
const { setTrim } = require('../../../shared/utils');

const roles = sequelize.define('roles',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      set: setTrim("name"),
    },

    description: {
      type: Sequelize.STRING,
    },

    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    timestamps: false, // This is to disable the timestamp columns autogenerated by sequelize createdAt and updatedAt
  }
);

module.exports = roles;