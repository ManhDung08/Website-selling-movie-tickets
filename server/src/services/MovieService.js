
// movieService.js
const Movie = require("./models/Movie");

exports.createMovie = async (movieData) => {
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
  } = movieData;

  // Validate input
  if (
    !title || !title.trim() ||
    !description || !description.trim() ||
    !duration || !duration.trim() ||
    !genre || !genre.trim() ||
    !releaseDate || !releaseDate.trim() ||
    !language || !language.trim() ||
    !director || !director.trim() ||
    !cast || !cast.trim() ||
    !poster || !poster.trim() ||
    !status || !status.trim()
  ) {
    return { error: true, message: "Invalid Input", statusCode: 422 };
  }

  // Create movie
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
    console.error(err);
    return { error: true, message: "Request Failed", statusCode: 500 };
  }

  return { error: false, movie };
};

exports.getAllMovie = async() => {
  return await MovieModel.find()
}

exports.getMovieById = async(id)=>{
  return await MovieModel.findById(id)
}

exports.deleteMovieById = async(id)=>{
  return await MovieModel.findByIdAndDelete(id)
}

exports.updateMovie = async(id,Movie) =>{
  return await MovieModel.findByIdAndUpdate(id, Movie)
}