module.exports = function (sequelize, DataTypes) {

  const User = sequelize.define("User", {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phoneNumer: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return User;
};