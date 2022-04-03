const { DataTypes } = require("sequelize")

const Book = (sequelize) => {
    return sequelize.define(
        "Book",
        {
            book_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cover_image: {
                type: DataTypes.STRING,
                allowNull: true
            }
           
        }
    )
}

module.exports = Book