import express from "express";

import Movie from "../models/Movie.js";

const moviesRouter = new express.Router();

moviesRouter.get("/", (req, res) => {
  const movies = Movie.findAll();
  res.render("movies/index", { movies: movies });
});

moviesRouter.get("/new", (req, res) => {
  res.render("movies/form")
})

moviesRouter.post("/", (req, res) => {
  const movieParams = req.body

  // movieParams.id = Movie.getNextMovieId()

  const newMovie = new Movie(movieParams)
  if (newMovie.save()){
    res.redirect("/movies")
  } else {
    res.render("movies/form", { errors: newMovie.errors, movie: newMovie })
  }
})

export default moviesRouter;
