import fs from "fs";
import _ from "lodash";

const disneyMoviesPath = "disneyMovies.json"

class Movie {
  constructor({ title, releaseYear, runtime }) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.runtime = runtime;
  }

  static findAll() {
    const moviesData = JSON.parse(fs.readFileSync(disneyMoviesPath))
    
    const movies = moviesData.disneyMovies.map(movie => {
      return new Movie(movie);
    })

    return movies
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
