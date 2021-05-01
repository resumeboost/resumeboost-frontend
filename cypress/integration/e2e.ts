/* eslint-disable jest/valid-expect */

// TODO: Clear DB before running the test

// TODO: Uncomment

describe("End-to-end User Flow", () => {
  // Clear database before running tests
  before(() => {
    cy.request("DELETE", "http://localhost:8000/testing/database");
  });

  // it("Login Page: Visits the Login Page", () => {
  //   cy.visit(`/login`);
  // });

  // it("Login Page: Links to Sign Up Button", () => {
  //   /* ==== Generated with Cypress Studio ==== */
  //   // TODO: Add ID
  //   cy.get("a > .cursor-pointer").click();
  //   /* ==== End Cypress Studio ==== */
  //   cy.location("pathname").should("eq", "/signup");
  // });

  // it("Login Page: Displays error when user does not exist", () => {
  //   cy.visit(`/login`);
  //   /* ==== Generated with Cypress Studio ==== */
  //   cy.get("#email").clear();
  //   cy.get("#email").type("user1@gmail.com");
  //   cy.get("#password").clear();
  //   cy.get("#password").type("password");
  //   // TODO: Add ID
  //   cy.get(".align-bottom").click();
  //   /* ==== End Cypress Studio ==== */
  //   // TODO: Actually wait for the request to finish
  //   cy.wait(2000);
  //   // TODO: Check for toast Should display error
  //   // Should still be on the same page
  //   cy.location("pathname").should("eq", "/login");
  // });

  // it("Sign Up Page: Visits the Sign Up Page", () => {
  //   cy.visit(`/signup`);
  // });

  // it("Sign Up Page: Links to Login Button", () => {
  //   cy.visit(`/signup`);
  //   /* ==== Generated with Cypress Studio ==== */
  //   // TODO: Add ID
  //   cy.get("a > .cursor-pointer").click();
  //   /* ==== End Cypress Studio ==== */
  //   cy.location("pathname").should("eq", "/login");
  // });

  it("Sign Up Page: Signs up user1", () => {
    cy.visit(`/signup`);
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#email").clear();
    cy.get("#email").type("user1@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("password");
    cy.get(".align-bottom").click();
    /* ==== End Cypress Studio ==== */
    // TODO: Actually wait for the request to finish
    cy.wait(2000);
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("Dashboard: Log out button", () => {
    cy.visit("/dashboard");

    cy.get("user-menu").click();
  });
});
