const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    // Nombre * Vida Fuerza Defensa Velocidad Altura Peso
    sequelize.define('Pokemon', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        idPoke: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        img: {
            type: DataTypes.STRING
        },
        hp: {
            type: DataTypes.INTEGER
        },
        attack: {
            type: DataTypes.INTEGER
        },
        defense: {
            type: DataTypes.INTEGER
        },
        speed: {
            type: DataTypes.INTEGER
        },
        height: {
            type: DataTypes.INTEGER
        },
        weight: {
            type: DataTypes.INTEGER
        },
        createdDb: {
            type: DataTypes.BOOLEAN,
            defaultValue: false  //hay que mandar true en los posts
        }
    },
        { timestamps: false });
};
