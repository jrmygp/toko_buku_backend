const { DataTypes } = require("sequelize")

const Genre = (sequelize) => {
    return sequelize.define(
        "Genre",
        {
            genre_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
           
        }
    )
}

module.exports = Genre