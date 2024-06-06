describe("Newsletter", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should display a success message", () => {
    cy.intercept("POST", "/newsletter*", { status: 201 }).as("subscribe"); // intercept any POST HTTP request to localhost:3000/newsletter*
    cy.visit("/");
    cy.get('[data-cy="newsletter-email"]').type("test@example.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait("@subscribe"); // this is not necessary, we use it just to make sure the next assumption executed after intercept
    cy.contains("Thanks for signing up!");
  });

  it("should display validation error message", () => {
    cy.intercept("POST", "/newsletter*", {
      message: "Email exists already",
    }).as("subscribe"); // intercept any POST HTTP request to localhost:3000/newsletter*
    cy.visit("/");
    cy.get('[data-cy="newsletter-email"]').type("test@example.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait("@subscribe"); // this is not necessary, we use it just to make sure the next assumption executed after intercept
    cy.contains("Email exists already");
  });
});
