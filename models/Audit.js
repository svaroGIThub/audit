module.exports = function (sequelize, DataTypes) {

  // set id to ALLOWNULL = TRUE 
  // because the auto increment is being handled by mysql

  const Audit = sequelize.define("Audit", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
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

  return Audit;
};
