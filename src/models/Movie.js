import fs from "fs";
import _ from "lodash";

const disneyMoviesPath = "disneyMovies.json"

class Movie {
  constructor({ title, releaseYear, runtime }) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.runtime = runtime;
  }

  // static or "class" method means we call it on the class, not on an instance
  static findAll() {
    // retrieve the JSON data, and turn it into JS (an object with an array)
    const jsonData = fs.readFileSync(disneyMoviesPath)
    const disneyMoviesObject = JSON.parse(jsonData)

    const moviesArray = disneyMoviesObject.disneyMovies
    const movies = moviesArray.map(movieObject => {
      return new Movie(movieObject)
    })
  
    return movies
  }



  save() {

      // grab all of the existing movies into an array, and add this one to it
      const movies = Movie.findAll()
      movies.push(this)
      
      // add all of these movies (including the new one) to the json file
      const jsonMovies = JSON.stringify({ disneyMovies: movies})
      fs.writeFileSync(disneyMoviesPath, jsonMovies)
  }
}

export default Movie;

  // static getNextMovieId() {
  //   // maxBy takes an array as its first argument, 
  //   // and a callback function that returns what we want to sort by (id)
  //   // then returns the element in the array that is the highest
  //   const maxMovie = _.maxBy(
  //     this.findAll(),
  //     (movie) => movie.id
  //   );
  //   // add one, because this is going to be the new id of the new movie object
  //   return maxMovie.id + 1;
  // }