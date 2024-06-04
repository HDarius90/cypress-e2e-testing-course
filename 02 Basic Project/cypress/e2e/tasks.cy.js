/// <reference types="Cypress" />

describe("tasks managemant", () => {
  it("should open and close the new tasks modal", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");

    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it("should add a new task", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Add Task").click();
    cy.get("#title").type("New task");
    cy.get("#summary").type("Some description");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("New task");
    cy.get(".task p").contains("Some description");
  });

  it("should validate user inpt", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.contains("Please provide values");
  });

  it("should add multiple task", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Add Task").click();
    cy.get("#title").type("Task 1");
    cy.get("#summary").type("First task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);

    cy.contains("Add Task").click();
    cy.get("#title").type("Task 2");
    cy.get("#summary").type("Secound task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 2);
    cy.get(".task").eq(0).contains("First task");
    cy.get(".task").eq(1).contains("Secound task");
  });
});
