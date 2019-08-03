module.exports = function (sequelize, DataTypes) {
  const Audit = sequelize.define("Audit", {
    aid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
      allowNull: false
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientAcronym: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Audit;
};
