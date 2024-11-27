import jwt from "jsonwebtoken";
import Movie from "../models/movie";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.header.authorization.split(" ")[1];
  if (!extractedToken || !extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }
  let adminId;

  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
  //tạo phim
  const {
    title,
    description,
    duration,
    genre,
    releaseDate,
    language,
    director,
    cast,
    poster,
    status,
  } = req.body;
  if (
    !title ||
    title.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !duration ||
    duration.trim() === "" ||
    !genre ||
    genre.trim() === "" ||
    !releaseDate ||
    releaseDate.trim() === "" ||
    !language ||
    language.trim() ||
    !director ||
    director.trim() === "" ||
    !cast ||
    cast.trim() === "" ||
    !poster ||
    poster.trim() ||
    !status ||
    status.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      duration,
      genre,
      releaseDate,
      language,
      director,
      cast,
      poster,
      status,
    });
    movie = await movie.save();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
};

export const getAllMovie = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
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
    movie = await Movie.findById(id);
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
    movie = await Movie.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully", movie });
};
