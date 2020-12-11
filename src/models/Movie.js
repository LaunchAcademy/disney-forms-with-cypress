import fs from "fs";
import _ from "lodash";

const disneyMoviesPath = "disneyMovies.json"

const disneyMoviesJson = () => {
  return JSON.parse(fs.readFileSync(disneyMoviesPath))
}

class Movie {
  constructor({ title, releaseYear, runtime }) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.runtime = runtime;
  }

  static findAll() {
    const moviesData = disneyMoviesJson().disneyMovies;

    let movies = [];
    moviesData.forEach((movie) => {
      const newMovie = new Movie(movie);
      movies.push(newMovie);
    });

    return movies;
  }

  // static getNextMovieId() {
  //   const maxMovie = _.maxBy(
  //     this.findAll(),
  //     (movie) => movie.id
  //   );
  //   return maxMovie.id + 1;
  // }

  save() {
    // this.id = this.constructor.getNextMovieId();
    const movies = this.constructor.findAll();
    movies.push(this);
    const data = { disneyMovies: movies };
    fs.writeFileSync(disneyMoviesPath, JSON.stringify(data));
    return true;
  }
}

export default Movie;
