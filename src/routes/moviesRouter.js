import express from "express";

import Movie from "../models/Movie.js";

const moviesRouter = new express.Router();

moviesRouter.get("/", (req, res) => {
  // const movies = Movie.findAll();

  res.render("movies/index", { });
});

// handle forms routes

export default moviesRouter;
