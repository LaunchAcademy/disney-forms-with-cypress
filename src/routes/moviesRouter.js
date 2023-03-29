import express from "express";

import Movie from "../models/Movie.js";

const moviesRouter = new express.Router();

// all paths here already begin with /movies

moviesRouter.get("/", (req, res) => {
  const moviesArray = Movie.findAll();
  res.render("movies/index", { movies: moviesArray });
});

moviesRouter.get("/new", (req, res) => {
  res.render("movies/movieFormForCoolPeople")
})

moviesRouter.post("/", (req, res) => {
  let movieData = req.body
  const newMovie = new Movie(movieData)

  // if there are errors
  if (newMovie.save()){
    // if there are no errors, do the following 
    // persist the new movie 
    newMovie.save()

    // redirect back to the index page
    res.redirect("/movies")
  } else {
    // re-render the page with those errors displaying 
    res.render("movies/movieFormForCoolPeople", { errors: errorMessages })
  }
})

export default moviesRouter;
