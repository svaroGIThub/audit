module.exports = function (sequelize, DataTypes) {

    const Balanza = sequelize.define("Balanza", {
        auditId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rubro: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clasificación: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cuentaMayor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        subCuenta: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cuentaContable: {
            type: DataTypes.STRING,
            allowNull: true
        },
        saldoInicial: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        cargos: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        abonos: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        saldoFinal: {
            type: DataTypes.DOUBLE,
            allowNull: true
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

    return Balanza;
};
