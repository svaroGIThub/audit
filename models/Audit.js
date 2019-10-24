module.exports = function(sequelize, DataTypes) {
  const Audit = sequelize.define(
    "Audit",
    {
      auditId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

  Audit.associate = function(models) {
    Audit.belongsTo(models.Client, { foreignKey: "clientId" });
  };

  return Audit;
};
