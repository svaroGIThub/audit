module.exports = function (sequelize, DataTypes) {

  // set id to ALLOWNULL = TRUE 
  // because the auto increment is being handled by mysql
  const Client = sequelize.define("Client", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abbreviation: {
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
    }
  });

  return Client;
};
