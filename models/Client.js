module.exports = function(sequelize, DataTypes) {
  const Client = sequelize.define("Client", {
    clientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "compositeIndex"
    },
    abbreviation: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "compositeIndex"
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
