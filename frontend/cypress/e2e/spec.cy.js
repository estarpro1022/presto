describe("template spec", () => {
  it("test", () => {
    cy.visit("/");
    cy.wait(3000);

    // Register a new user account
    cy.contains("Sign Up").click();
    cy.url().should("include", "/register");
    cy.wait(1000);
    cy.get("#email").type("cypress@cypress");
    cy.get("#username").type("cypress");
    cy.get("#password").type("cypress");
    cy.get("#confirm").type("cypress");
    cy.get('button[type="submit"]').contains("register").click();
    cy.contains("Register Successfully!").should("be.visible");

    // Create a new presentation
    cy.wait(2000);
    cy.contains("New").click();
    cy.wait(500);
    cy.contains("Create New Presentations").should("be.visible");
    cy.get("#name") // Use the id `name-input` for the "name" field
      .type("hello presto");
    cy.get("#description") // Use the id `description-input` for the "description" field
      .type("I'm description...");
    cy.get("button")
      .contains("Create") // Use the id `create-button` for the "Create" button
      .click();
    cy.contains("Create New Presentations").should("not.exist"); // Dialog should be closed after submission
    cy.contains("hello presto").should("exist"); // Make sure the new presentation name is visible

    cy.contains("hello presto").click();
    cy.wait(1000);

    // Update name
    cy.get('#modify-name').click();
    cy.contains("Modify Name").should("be.visible");
    cy.wait(500);
    cy.get("#name").type("modify presto name"); // Use the id `name-input` for the "name" field
    cy.get('button').contains("Create").click();
    cy.contains("modify presto name").should("exist");

    // Update thumbnail
    cy.get("#upload-thumbnail").click();
    cy.wait(500);
    cy.contains("Upload Thumbnail").should("be.visible");
    cy.get("#thumbnail").type(
      "https://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_brown.png"
    );
    cy.get("button").contains("Create").click();

    // create a new slide
    cy.get("#create-slide").click();
    cy.wait(1000);
    cy.get("#create-slide").click();
    cy.wait(1000);

    // switch between slides
    cy.get("#right-arrow").click();
    cy.contains("2th").should("be.visible");
    cy.wait(1500);
    cy.get("#left-arrow").click();
    cy.contains("1th").should("be.visible");
    cy.wait(1000);

    // delete a presentation
    cy.get("#delete-pre").click();
    cy.contains("Confirm Deletion").should("be.visible");
    cy.wait(1000);
    cy.get("button").contains("Yes").click();
    cy.url().should("include", "/dashboard")

    // Logout
    cy.get("#logout").click();
    cy.wait(1000);
    cy.url().should("include", "/");

    // Log back
    cy.wait(1000);
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get("#email").type("cypress@cypress");
    cy.get("#password").type("cypress");
    cy.get('button[type="submit"]').contains("login").click();
    cy.contains("Login Successfully!").should("be.visible");
    cy.wait(1000);
  });
});
