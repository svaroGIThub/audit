module.exports = function (sequelize, DataTypes) {

  const Audit = sequelize.define("Audit", {
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
    },
    hasBalanza: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    hasNómina: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  return Audit;
};
