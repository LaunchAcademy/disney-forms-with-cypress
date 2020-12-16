import express from "express";

import Movie from "../models/Movie.js";

const moviesRouter = new express.Router();

moviesRouter.get("/", (req, res) => {
  const movies = Movie.findAll();
  res.render("movies/index", { movies });
});

moviesRouter.get("/new", (req, res) => {
  res.render("movies/new")
})

moviesRouter.post("/", (req, res) => {
  const movieTitle = req.body.title
  const movieReleaseYear = req.body.releaseYear
  const movieRuntime = req.body.runtime

  const newMovieObject = {title: movieTitle, releaseYear: movieReleaseYear, runtime: movieRuntime}

  const newMovie = new Movie(newMovieObject)

  if(newMovie.save()) {
    res.redirect("/movies")
  } else {
    res.render("movies/new", { errors: newMovie.errors, movie: newMovie })
  }
})

export default moviesRouter;
