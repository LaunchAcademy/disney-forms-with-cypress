import fs from "fs";
import _ from "lodash";

const disneyMoviesPath = "disneyMovies.json"

class Movie {
  constructor({ id, title, releaseYear, runtime }) {
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.runtime = runtime
  }

  // static or "class" method means we call it on the class, not on an instance
  static findAll() {
    // retrieve the JSON data, and turn it into JS (an object with an array)
    const moviesDataObject = JSON.parse(fs.readFileSync(disneyMoviesPath))

    // iterate over all of the movies, and ensure they are remade as Movie objects
    const movies = moviesDataObject.disneyMovies.map((movie) => {
      // each `return` in .map creates a new element in the `movies` array
      return new Movie(movie);
    });

    return movies
  }


  isValid() {
  // an empty errors object to add to
  this.errors = {}
  // the fields we wish to check for
  const requiredFields = ["title", "releaseYear", "runtime"]
  // by default, we will assume the movie is valid
  let isValid = true

  for (const requiredField of requiredFields) {
    // create a new key using the required field, that we can add errors to 
    this.errors[requiredField] = []
    // if the field is not on the object we are calling `isValid` on
    if (!this[requiredField]) {
      // set `isValid` to false 
      isValid = false
      // and add an error message to the array
      this.errors[requiredField].push("can't be blank")
    }
  }

  return isValid
}

  static getNextMovieId() {
    // maxBy takes an array as its first argument, 
    // and a callback function that returns what we want to sort by (id)
    // then returns the element in the array that is the highest
    const maxMovie = _.maxBy(
      this.findAll(),
      (movie) => movie.id
    );
    // add one, because this is going to be the new id of the new movie object
    return maxMovie.id + 1;
  }

  save() {
    // if this Movie object passes the check
    if (this.isValid()) {
    // delete all errors and grab the id for soon to be persisted movie
    delete this.errors
    this.id = this.constructor.getNextMovieId();

    // grab all of the existing movies into an array, and add this one to it
    const movies = this.constructor.findAll();
    movies.push(this);

    // add all of these movies (including the new one) to the json file
    const data = { disneyMovies: movies };
    fs.writeFileSync(disneyMoviesPath, JSON.stringify(data));
    return true;
    } else {
    // if it isnt valid, we return false
      return false
    }
  }
}

export default Movie