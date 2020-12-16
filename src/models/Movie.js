import fs from "fs";
import _ from "lodash";

const disneyMoviesPath = "disneyMovies.json"

class Movie {
  constructor({ id, title, releaseYear, runtime }) {
    this.id = id;
    this.title = title;
    this.releaseYear = releaseYear;
    this.runtime = runtime;
  }

  static findAll() {
    const moviesData = JSON.parse(fs.readFileSync(disneyMoviesPath))

    const movies = moviesData.disneyMovies.map((movie) => {
      return new Movie(movie);
    });

    return movies
  }

  isValid() {
    this.errors = {}
    const requiredFields = ["title", "releaseYear", "runtime"]
    let isValid = true

    for (const requiredField of requiredFields) {
      this.errors[requiredField] = []
      if(!this[requiredField]) {
        isValid = false
        this.errors[requiredField].push("can't be blank")
      }
    }
    
    return isValid
  }

  static getNextMovieId() {
    const maxMovie = _.maxBy(
      this.findAll(),
      (movie) => movie.id
    );
    return maxMovie.id + 1;
  }

  save() {
    if (this.isValid()) {
      delete this.errors
      this.id = this.constructor.getNextMovieId();
      
      const movies = this.constructor.findAll();
      movies.push(this);
      
      const data = { disneyMovies: movies };
      fs.writeFileSync(disneyMoviesPath, JSON.stringify(data));
      return true;
    } else {
      return false
    }
  }
}

export default Movie;
