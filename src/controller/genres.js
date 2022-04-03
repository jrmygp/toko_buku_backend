const { Genre } = require("../lib/sequelize");

const genreController = {
  showAllGenre: async (req, res) => {
    try {
      const { _limit = 10, _page = 1 } = req.query;
      delete req.query._limit;
      delete req.query._page;

      const findGenres = await Genre.findAndCountAll({
        where: {
          ...req.query,
        },

        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
      });
      return res.status(201).json({
        message: "Genre fetched successfully",
        result: findGenres,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  },
  addNewGenre: async (req, res) => {
    try {
      const { genre_name } = req.body;
      const isGenreTaken = await Genre.findOne({
        where: {
          genre_name,
        },
      });
      if (isGenreTaken) {
        return res.status(400).json({
          message: "Genre already exist, make a new one!",
        });
      }
      const newGenre = await Genre.create({
        genre_name,
      });
      res.status(201).json({
        message: "New genre added!",
        result: newGenre,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  },
  deleteGenre: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteGenre = await Genre.destroy({
        where: {
          id,
        },
      });
      return res.status(201).json({
        message: "Genre deleted successfully",
        result: deleteGenre,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server Error",
      });
    }
  },
};

module.exports = genreController;
