module.exports = function(sequelize, DataTypes) {
  const Audit = sequelize.define(
    "Audit",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      clientAbbreviation: {
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
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"],
          msg: "Esta auditoría ya existe"
        }
      ]
    }
  );

  return Audit;
};
