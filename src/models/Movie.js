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
    const moviesData = JSON.parse(fs.readFileSync(disneyMoviesPath))

    // iterate over all of the movies, and ensure they are remade as Movie objects
    const movies = moviesData.disneyMovies.map((movie) => {
      // each `return` in .map creates a new element in the `movies` array
      return new Movie(movie);
    });

    return movies
  }



  save() {

      // grab all of the existing movies into an array, and add this one to it
      const movies = this.constructor.findAll();
      movies.push(this);
      
      // add all of these movies (including the new one) to the json file
      const data = { disneyMovies: movies };
      fs.writeFileSync(disneyMoviesPath, JSON.stringify(data));
      return true;
   
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