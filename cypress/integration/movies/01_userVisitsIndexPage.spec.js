/// <reference types="cypress" />

// import starterDisneyMovies from "../../fixtures/starterDisneyMovies.json"

const disneyMoviesFilePath = "disneyMovies.json"

describe("User Visits Index Page", () => {
  beforeEach(() => {
    cy.visit("/movies")
  })
  
  context("when arriving at the movie index page", () => {
    it("sees the first two movies listed on the page", () => {
      cy.get(".movies")
        .find("li")
        .first()
        .should("have.text", "Beauty and the Beast, 1991, 84 minutes")

      cy.get(".movies")
        .find("li")
        .eq(1)
        .should("have.text", "Cinderella, 1950, 75 minutes")
    })

    it("the user can navigate to the form through a link on the index page", () => {
      cy.get("a")
        .should("have.text", "Add a Movie")
        .click()

      cy.url().should("eq", "http://localhost:3000/movies/new")
    })
  })
  // not needed for tests that don't edit our data in some way
  // afterEach(() => {
  //   cy.writeFile(disneyMoviesFilePath, JSON.stringify(starterDisneyMovies))
  // })
})