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
  let errorMessages = []
  
  if (req.body.title === "") {
    errorMessages.push("title can't be blank")
  }
  if (req.body.releaseYear === ""){
    errorMessages.push("releaseYear can't be blank")
  }  
  if (req.body.runtime === ""){
    errorMessages.push("runtime can't be blank")
  }

  // if there are errors
  if (errorMessages.length > 0){
    // re-render the page with those errors displaying 
    res.render("movies/movieFormForCoolPeople", { errors: errorMessages })

  } else {
    // if there are no errors, do the following 

    
    // persist the new movie 
    let movieData = req.body
    const newMovie = new Movie(movieData)
    newMovie.save()

    // redirect back to the index page
    res.redirect("/movies")
  }
})

export default moviesRouter;
