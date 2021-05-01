/* eslint-disable jest/valid-expect */

// TODO: Clear DB before running the test

// TODO: Uncomment

describe("End-to-end User Flow", () => {
  // Clear database before running tests
  before(() => {
    cy.request("DELETE", "http://localhost:8000/testing/database");
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: "access_token",
    });
  });

  it("Login Page: Visits the Login Page", () => {
    cy.visit(`/login`);
  });

  it("Login Page: Links to Sign Up Button", () => {
    /* ==== Generated with Cypress Studio ==== */
    // TODO: Add ID
    cy.get("a > .cursor-pointer").click();
    /* ==== End Cypress Studio ==== */
    cy.location("pathname").should("eq", "/signup");
  });

  it("Login Page: Displays error when user does not exist", () => {
    cy.visit(`/login`);
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#email").clear();
    cy.get("#email").type("user1@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("password");
    // TODO: Add ID
    cy.get(".align-bottom").click();
    /* ==== End Cypress Studio ==== */
    // Actually wait for the request to finish
    cy.waitUntil(() => cy.contains("Invalid email/password. Please try again"));
    cy.location("pathname").should("eq", "/login");
  });

  it("Sign Up Page: Visits the Sign Up Page", () => {
    cy.visit(`/signup`);
  });

  it("Sign Up Page: Links to Login Button", () => {
    cy.visit(`/signup`);
    /* ==== Generated with Cypress Studio ==== */
    // TODO: Add ID
    cy.get("a > .cursor-pointer").click();
    /* ==== End Cypress Studio ==== */
    cy.location("pathname").should("eq", "/login");
  });

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
    cy.waitUntil(() => cy.location("pathname").should("eq", "/dashboard"));
  });

  it(
    "User Profile: Upload Resume for user1",
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.visit("/");

      cy.get("#\\#profile-navbar").click();

      cy.get('input[type="file"]').attachFile("resumes/user1.pdf");

      cy.get("#\\#submit-resume").click();
      cy.waitUntil(() => cy.contains("Successfully uploaded resume"));
    }
  );

  it("Dashboard: Log out button", () => {
    cy.visit("/dashboard");
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#user-menu > .h-8").click();
    cy.get("#\\#logout-dropdown").click();
    /* ==== End Cypress Studio ==== */

    cy.waitUntil(() => cy.location("pathname").should("eq", "/login"));

    // After logging out, should not be able to go to dashboard
    cy.visit("/dashboard");
    cy.waitUntil(() => cy.location("pathname").should("eq", "/login"));
  });

  it("Sign Up Page: Signs up user2", () => {
    cy.visit(`/signup`);

    /* ==== Generated with Cypress Studio ==== */
    cy.get("#email").clear();
    cy.get("#email").type("user2@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("password");
    cy.get(".align-bottom").click();
    /* ==== End Cypress Studio ==== */
    // TODO: Actually wait for the request to finish
    cy.waitUntil(() => cy.location("pathname").should("eq", "/dashboard"));
  });

  it("Navbar: Link to User Profile Page works", () => {
    cy.visit("/dashboard");

    /* ==== Generated with Cypress Studio ==== */
    cy.get("#\\#profile-navbar").click();
    /* ==== End Cypress Studio ==== */

    cy.waitUntil(() => cy.location("pathname").should("eq", "/profile"));
  });

  it("User Profile: Adding Target Companies", () => {
    cy.visit("/profile");

    /* ==== Generated with Cypress Studio ==== */
    cy.get("#\\#profile-navbar").click();

    cy.get(":nth-child(1) > :nth-child(3) > .m-4 > .rounded-lg").clear();
    cy.get(":nth-child(1) > :nth-child(3) > .m-4 > .rounded-lg").type(
      "Company1"
    );
    cy.get(":nth-child(1) > :nth-child(3) > .m-4 > .px-8").click();
    cy.get(":nth-child(1) > :nth-child(3) > .m-4 > .rounded-lg").clear();
    cy.get(":nth-child(1) > :nth-child(3) > .m-4 > .rounded-lg").type(
      "Company2"
    );
    cy.get(":nth-child(1) > :nth-child(3) > .m-4 > .px-8").click();
    /* ==== End Cypress Studio ==== */

    cy.contains("Company1");
    cy.contains("Company2");
  });

  it("User Profile: Adding Target Positions", () => {
    cy.visit("/profile");

    /* ==== Generated with Cypress Studio ==== */
    cy.get("#\\#profile-navbar").click();
    cy.get(":nth-child(2) > :nth-child(3) > .m-4 > .rounded-lg").clear();
    cy.get(":nth-child(2) > :nth-child(3) > .m-4 > .rounded-lg").type(
      "Position1"
    );
    cy.get(":nth-child(2) > :nth-child(3) > .m-4 > .px-8").click();
    cy.get(":nth-child(2) > :nth-child(3) > .m-4 > .rounded-lg").clear();
    cy.get(":nth-child(2) > :nth-child(3) > .m-4 > .rounded-lg").type(
      "Position2"
    );
    cy.get(":nth-child(2) > :nth-child(3) > .m-4 > .px-8").click();
    /* ==== End Cypress Studio ==== */

    cy.contains("Position1");
    cy.contains("Position2");
  });

  it("User Profile: Can remove target Companies and Positions", () => {
    cy.visit("/");

    // Remove Company2 and Position2
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#\\#profile-navbar").click();
    cy.get(
      ":nth-child(1) > .flex-wrap > :nth-child(2) > .absolute > span"
    ).click();
    cy.get(":nth-child(2) > .absolute > span").click();
    /* ==== End Cypress Studio ==== */

    cy.waitUntil(() => cy.contains("Successfully updated user preferences"));
  });

  it("User Profile: Persists Target Companies and Positions", () => {
    cy.visit("/");
    cy.get("#\\#profile-navbar").click();
    cy.contains("Company1");
    cy.contains("Position1");
    cy.contains("Company2").should("not.exist");
    cy.contains("Position2").should("not.exist");
  });

  it(
    "User Profile: Upload Resume for user2",
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.visit("/");

      cy.get("#\\#profile-navbar").click();

      cy.get('input[type="file"]').attachFile("resumes/user2.pdf");

      cy.get("#\\#submit-resume").click();
      cy.waitUntil(() => cy.contains("Successfully uploaded resume"));
    }
  );

  it(
    "User Profile: Uploading non-PDF file shows error",
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.visit("/");

      cy.get("#\\#profile-navbar").click();

      cy.get('input[type="file"]').attachFile("resumes/image.png");

      cy.get("#\\#submit-resume").click();
      cy.waitUntil(() =>
        cy.contains("Error while uploading resume, please try again")
      );
    }
  );

  it("Review Page: Submit Review", () => {
    cy.visit("/");
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#\\#review-navbar").click();
    cy.get("#response").type("Great resume");
    cy.get(".align-bottom").click();
    /* ==== End Cypress Studio ==== */
  });

  it("Dashboard: Log out user2", () => {
    cy.visit("/dashboard");
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#user-menu > .h-8").click();
    cy.get("#\\#logout-dropdown").click();
    /* ==== End Cypress Studio ==== */

    cy.waitUntil(() => cy.location("pathname").should("eq", "/login"));

    // After logging out, should not be able to go to dashboard
    cy.visit("/dashboard");
    cy.waitUntil(() => cy.location("pathname").should("eq", "/login"));
  });

  it("Login Page: Login User1 with wrong password", () => {
    cy.visit(`/login`);
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#email").clear();
    cy.get("#email").type("user1@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("wrongpassword");
    // TODO: Add ID
    cy.get(".align-bottom").click();
    /* ==== End Cypress Studio ==== */
    // Actually wait for the request to finish
    cy.waitUntil(() => cy.contains("Invalid email/password. Please try again"));
  });

  it("Login Page: Login User1", () => {
    cy.visit(`/login`);
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#email").clear();
    cy.get("#email").type("user1@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("password");
    // TODO: Add ID
    cy.get(".align-bottom").click();
    /* ==== End Cypress Studio ==== */
    // Actually wait for the request to finish
    cy.waitUntil(() => cy.location("pathname").should("eq", "/dashboard"));
  });

  it("Dashboard Page: User1 can see review and resume is displayed", () => {
    cy.visit("/");

    /* ==== Generated with Cypress Studio ==== */
    cy.get(".react-pdf__Page__canvas").should("exist");
    cy.get("#score-Visual").should("have.text", "3.0");
    cy.get("#score-Content").should("have.text", "3.0");
    cy.get("#score-Relevance").should("have.text", "3.0");
    cy.get("[data-testid=comment]").should("have.text", "Great resume");
    cy.get("[data-testid=visual]").should("have.text", "3");
    cy.get("[data-testid=content]").should("have.text", "3");
    cy.get("[data-testid=relevance]").should("have.text", "3");
    /* ==== End Cypress Studio ==== */
  });

  it("AB Test Page: Can render", () => {
    cy.visit("/");
    cy.get("#\\#abtesting-navbar").click();
    cy.waitUntil(() => cy.location("pathname").should("eq", "/abtesting"));
  });
});
