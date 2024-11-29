const adminMiddleware = require("../middleware/auth")
const jwt = require("jsonwebtoken");
const movieService = require("../services/MovieService");

export const CreateMovie = async (req, res) => {
  const extractedToken = adminMiddleware(req,res,next);
  if (!extractedToken) {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    }
    adminId = decrypted.id;
  });

  const result = await movieService.createMovie(req.body);

  if (result.error) {
    return res.status(result.statusCode).json({ message: result.message });
  }

  return res.status(201).json({ movie: result.movie });
};


export const getAllMovie = async (req, res, next) => {
  let movies;
  try {
    movies = await movieService.getAllMovie()
  } catch (err) {
    console.log(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await movieService.getMovieById.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie Id" });
  }

  return res.status(200).json({ movie });
};


export const deleteMovieById = async (req, res, next) => {
  const id = req.params.id;

  let movie;
  try {
    movie = await movieService.deleteMovieById(id, req.body)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully", movie });
};

export const updateMovie = async (req, res, next) => {
  const id = req.params.id;
  
  let movie;
  try {
    movie = await movieService.updateMovie(id, req.body)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully", movie });
};

