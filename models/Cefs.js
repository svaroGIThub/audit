module.exports = function (sequelize, DataTypes) {

    const Cefs = sequelize.define("Cefs", {
        auditId: { type: DataTypes.INTEGER, allowNull: false },
        c1: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c2: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c3: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c4: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c5: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c6: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c7: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c8: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c9: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c10: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c11: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c12: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c13: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c14: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c15: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c16: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c17: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c18: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c19: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        c20: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
            tableName: "Cefs"
        });

    return Cefs;
};
