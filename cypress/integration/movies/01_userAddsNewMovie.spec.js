/// <reference types="cypress" />

import newMovie from "../../fixtures/newDisneyMovie.json";
import starterDisneyMovies from "../../fixtures/starterDisneyMovies.json";

const disneyMoviesFilePath = "disneyMovies.json";

describe("New Movie form", () => {
  beforeEach(() => {
    cy.visit("/movies/new");
  });

  it("displays the text 'Add a New Movie'", () => {
    cy.get("h1")
      .should("have.text", "Add a New Movie");
  });

  context("when the form is submitted correctly", () => {
    it("the user is redirected back to the index page where they can see the new movie info", () => {
      cy.get("form").within(($form) => {
        cy.get("#title")
          .type(newMovie.title)
          .should("have.value", newMovie.title);
  
        cy.get("#releaseYear")
          .type(newMovie.releaseYear)
          .should("have.value", newMovie.releaseYear);
        
          cy.get("#runtime")
            .type(newMovie.runtime)
            .should("have.value", newMovie.runtime);
  
        cy.get(".button").should("have.value", "Save!");
        
        cy.root().submit();
      });
  
      cy.url().should("eq", "http://localhost:3000/movies");
      // cy.url().should("include", "/movies");
      
      cy.get(".movies")
        .find("li")
        .last()
        .should(
          "have.text",
          `${newMovie.title}, ${newMovie.releaseYear}, ${newMovie.runtime}`
          );
        });
    });
    
    context("when the form is submitted incorrectly", () => {
      it("the user stays on the new movie form page", () => {
        cy.get("form").within(($form) => {
          cy.root().submit();
        });
        
        cy.url().should("eq", "http://localhost:3000/movies/new");
        // cy.url().should("include", "/movies/new");
        
      cy.get("h1")
        .should("have.text", "Add a New Movie");
    });

    it("does not create a blank li element on the index page", () => {
      cy.get("form").within(($form) => {
        cy.root().submit();
      });

      cy.visit("/movies");

      cy.get("li")
        .last()
        .should("not.have.text", "");
      });
  });

  afterEach(() => {
    cy.writeFile(
      disneyMoviesFilePath,
      JSON.stringify(starterDisneyMovies)
    );
  });
});
