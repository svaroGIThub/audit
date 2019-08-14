module.exports = function (sequelize, DataTypes) {

  // set id to ALLOWNULL = TRUE 
  // because the auto increment is being handled by mysql

  const Client = sequelize.define("Client", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    acronym: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  return Client;
};
