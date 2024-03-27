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

moviesRouter.post("/addTheMovie", (req, res) => {
    const title = req.body.title
    const releaseYear = req.body.releaseYear
    const runtime = req.body.runtime

    if (title.trim() !== "" && releaseYear.trim() !== "" && runtime.trim() !== "") {
      const newMovie = new Movie({ title, releaseYear, runtime })
      newMovie.save()
      res.redirect("/movies")
    } else {
      const errors = []
      if (title.trim() === "") {
        errors.push("title can't be blank")
      }
      if (runtime.trim() === "") {
        errors.push("runtime can't be blank")
      }
      if (releaseYear.trim() === "") {
        errors.push("releaseYear can't be blank")
      }


      res.render("movies/form", { errors: errors, title: title, releaseYear: releaseYear, runtime: runtime})
    }
})


export default moviesRouter;
