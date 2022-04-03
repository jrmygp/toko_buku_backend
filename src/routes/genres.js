const { genreController } = require("../controller")

const router = require("express").Router()

router.get("/", genreController.showAllGenre)
router.post("/", genreController.addNewGenre)
router.delete("/:id", genreController.deleteGenre)

module.exports = router