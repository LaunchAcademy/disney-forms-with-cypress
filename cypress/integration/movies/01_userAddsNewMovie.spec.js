/// <reference types="cypress" />

import newMovie from "../../fixtures/newDisneyMovie.json"
import starterDisneyMovies from "../../fixtures/starterDisneyMovies.json"

const disneyMoviesFilePath = "disneyMovies.json"

describe("New Movie Form", () => {
  beforeEach(() => {
    cy.visit("/movies/new")
  })
  
  it("can navigate to the form through a link on the index page", () => {
    cy.visit("/movies")

    cy.get("a")
      .should("have.text", "Add a Movie")
      .and("have.attr", "href", "/movies/new")
      .click()
    
      cy.url().should("eq", "http://localhost:3000/movies/new")
  })

  it("displays the text 'Add a New Movie", () => {
    cy.get("h1")
      .should("have.text", "Add a New Movie")
  })

  context("when the form is submitted correctly", () => {
    it("the user is redirected to the index page where they can see the new movie info", () => {
      cy.get("#title")
        .type(newMovie.title)
        .should("have.value", newMovie.title)

      cy.get("#releaseYear")
        .type(newMovie.releaseYear)
        .should("have.value", newMovie.releaseYear)

      cy.get("#runtime")
        .type(newMovie.runtime)
        .should("have.value", newMovie.runtime)

      cy.get(".button")
        .should("have.value", "Save!")
        .and("have.attr", "type", "submit")
      
      cy.get(".new-movie-form").submit()

      cy.url().should("eq", "http://localhost:3000/movies")

      cy.get(".movies")
        .find("li")
        .last()
        .should("have.text", `${newMovie.title}, ${newMovie.releaseYear}, ${newMovie.runtime}`)
    })
  })

  context("when the form is submitted incorrectly", () => {
    it("the user remains on the new movie form page", () => {
      cy.get(".new-movie-form").submit()

      cy.get("h1")
        .should("have.text", "Add a New Movie")
    })

    it("displays error validation messages", () => {
      cy.get("#title")
        .type(newMovie.title)
        .should("have.value", newMovie.title)

      cy.get(".new-movie-form").submit()

      cy.get(".errors")
        .find("li")
        .eq(0)
        .should("have.text", "releaseYear can't be blank")
      
      cy.get(".errors")
        .find("li")
        .eq(1)
        .should("have.text", "runtime can't be blank")
    })

    it("populates input fields with any previously submitted data", () => {
      cy.get("#title")
        .type(newMovie.title)
        .should("have.value", newMovie.title)
      
      cy.get(".new-movie-form").submit()

      cy.get("#title")
        .should("have.value", newMovie.title)
    })

    it("does not create an empty 'li' element on the index page", () => {
      cy.get(".new-movie-form").submit()

      cy.visit("/movies")

      cy.get(".movies")
        .find("li")
        .last()
        .should("not.have.text", "")
    })
  })

  afterEach(() => {
    cy.writeFile(disneyMoviesFilePath, JSON.stringify(starterDisneyMovies))
  })
})