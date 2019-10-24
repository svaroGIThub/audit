module.exports = function(sequelize, DataTypes) {
  const Client = sequelize.define("Client", {
    clientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
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

  Client.associate = function(models) {
    Client.hasMany(models.Audit, { foreignKey: "clientId" });
  };

  return Client;
};
