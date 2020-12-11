import express from "express";

import Movie from "../models/Movie.js";

const moviesRouter = new express.Router();

moviesRouter.get("/", (req, res) => {
  const movies = Movie.findAll();
  res.render("movies/index", { movies });
});

moviesRouter.get("/new", (req, res) => {
  res.render("movies/new");
});

moviesRouter.post("/", (req, res) => {
  const title = req.body.title
  const releaseYear = req.body.releaseYear
  const runtime = req.body.runtime
  
  // debugger
  if (title != "" && releaseYear != "" && runtime != "") {
    const movie = new Movie(req.body);
    movie.save();
    
    res.redirect("/movies");
  } else {
    res.render("movies/new");
  }
});

export default moviesRouter;
