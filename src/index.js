const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT

const { sequelize } = require("./lib/sequelize")
sequelize.sync({ alter: true })

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Welcome to my API </h1>")
})

const { genreRoutes, bookRoutes } = require("./routes")
app.use("/genres", genreRoutes)
app.use("/books", bookRoutes)


app.listen(PORT, () => {
    console.log("listening in port", PORT)
})