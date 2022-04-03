const { Sequelize } = require("sequelize")
const mysqlConfig = require("../configs/database")

const sequelize = new Sequelize({
    username: mysqlConfig.MYSQL_USERNAME,
    password: mysqlConfig.MYSQL_PASSWORD,
    database: mysqlConfig.MYSQL_DB_NAME,
    port: 3306,
    dialect: "mysql",
    logging: false
})
const Genre = require("../models/genre")(sequelize)
const Book = require("../models/book")(sequelize)
const Book_genre = require("../models/book_genre")(sequelize)

Genre.hasMany(Book_genre, {foreignKey: "genre_id"})
Book_genre.belongsTo(Genre, {foreignKey: "genre_id"})
Book.hasMany(Book_genre, {foreignKey: "book_id"})
Book_genre.belongsTo(Book, {foreignKey: "book_id"})



module.exports = {
    sequelize,
    Genre,
    Book,
    Book_genre
}