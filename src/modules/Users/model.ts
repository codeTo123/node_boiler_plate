"use strict";
module.exports = function (sequelize: any, DataTypes: any) {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      avatar:{
        type:DataTypes.STRING(256),
        allowNull:true
      },
      status: {
        type: DataTypes.ENUM("active", "in-active"),
        allownull: true,
        defaultValue: "active",
      },
      is_active: {
        type: DataTypes.TINYINT,
        comment: "0=false,1=true",
        defaultValue: 0,
      },
      fees: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE(),
        defaultValue: new Date(),
      },
      deleted_at: {
        type: DataTypes.DATE(),
      },
      refresh_token: {
        type: DataTypes.TEXT(),
      },

      // aadhar_number: {
      //   type: DataTypes.STRING(12),
      //   allowNull: false,
      //   unique: {
      //     name: 'unique_aadhar_number',
      //     msg: 'Aadhar number must be unique.',
      //   },
      //   validate: {
      //     len: {
      //       args: [12, 12],
      //       msg: 'Aadhar number must be exactly 12 digits.',
      //     },
      //     isNumeric: {
      //       msg: 'Aadhar number must contain only digits.',
      //     },
      //   },
      // },
    },
    {
      tableName: "users",
      timestamps: false,
      underscored: true,
    }
  );
  // Users.associate = function (models: any) {
  //   Users.hasMany(models.UserRoles, {
  //     foreignKey: "id",
  //     targetKey: "user_id",
  //   });
  //   Users.belongsTo(models.fees, {
  //     foreignKey: "user_id",
  //     as: "user_detail",
  //   });
  // };

  return {
    Users
  };
};
