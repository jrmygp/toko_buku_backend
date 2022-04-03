const { bookController } = require("../controller")

const router = require("express").Router()

router.get("/", bookController.showAllBooks)
router.post("/", bookController.addNewBook)
router.delete("/:id", bookController.deleteBook)

module.exports = router