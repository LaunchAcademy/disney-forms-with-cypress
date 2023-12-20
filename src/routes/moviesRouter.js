import express from "express";
import fs from "fs";
import _ from "lodash";

const disneyMoviesPath = "disneyMovies.json"

import Movie from "../models/Movie.js";

const moviesRouter = new express.Router();

moviesRouter.get("/", (req, res) => {
  const movies = Movie.findAll();

  res.render("movies/index", { movies: movies });
});

moviesRouter.get("/new", (req, res) => {
  res.render("movies/new")
})

// handle forms routes
moviesRouter.post("/", (req, res) => {
  const newMovie = new Movie(req.body)
  if (newMovie.save()) {
    res.redirect("/movies")
  } else {
    res.render("movies/new")
  }
})

export default moviesRouter;
