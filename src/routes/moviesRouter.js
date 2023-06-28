import express from "express"

import Movie from "../models/Movie.js"

const moviesRouter = new express.Router()

// any path in this router starts with /movies

moviesRouter.get("/", (req, res) => {
  const movies = Movie.findAll()
  res.render("movies/index", { movies })
})

moviesRouter.get("/new", (req, res) => {
  res.render("movies/newForm")
})

moviesRouter.post("/", (req, res) => {
  console.log(req.body)
  // { title: 'mulan', releaseYear: '1998', runtime: '88' }
  const newMovieData = req.body
  const { title, releaseYear, runtime } = req.body
  // const title = req.body.title

  // sad path - errors
  if (title === "" || releaseYear === "" || runtime === "") {
    const errors = []
    if (title === "") {
      errors.push("title can't be blank")
    }

    if (releaseYear === "") {
      errors.push("releaseYear can't be blank")
    }

    if (runtime === "") {
      errors.push("runtime can't be blank")
    }
    console.log(errors)
    res.render("movies/newForm", { movieData: newMovieData, errors: errors })
  } else {
    // happy path - successful
    const newMovieObject = new Movie(newMovieData)
    console.log(newMovieObject)
    newMovieObject.save()
    res.redirect("/movies")
  }
})

export default moviesRouter
