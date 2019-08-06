module.exports = function (sequelize, DataTypes) {

  const Client = sequelize.define("Client", {
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
    }
  });

  return Client;
};
