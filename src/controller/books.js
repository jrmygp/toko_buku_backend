const { Book } = require("../lib/sequelize");

const bookController = {
  showAllBooks: async (req, res) => {
    try {
      const { _limit = 10, _page = 1 } = req.query;
      delete req.query._limit;
      delete req.query._page;

      const findBooks = await Book.findAndCountAll({
        where: {
          ...req.query,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
      });
      return res.status(201).json({
        message: "Books fetched successfully",
        result: findBooks,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  },
  
  addNewBook: async (req, res) => {
      try {
       const { book_name } = req.body;
        const isBookTaken = await Book.findOne({
          where: {
            book_name,
          },
        });
        if (isBookTaken) {
          return res.status(400).json({
            message: "Book already exist, make a new one!",
          });
        }
        const newBook = await Book.create({
          book_name,
    
        });
        res.status(201).json({
          message: "New book added!",
          result: newBook,
        });

          
      } catch (err) {
          console.log(err)
          res.status(500).json({
              message: "Server Error"
          })
          
      }
  },
  
  deleteBook: async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBook = await Book.destroy({
          where: {
            id,
          },
        });
        return res.status(201).json({
          message: "Book deleted successfully",
          result: deleteBook,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Server Error",
        });
      }
    },
};

module.exports = bookController;
