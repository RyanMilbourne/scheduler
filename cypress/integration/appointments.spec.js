describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("[data-testid=day]", "Monday");
  });

  it("should book an interview", () => {

    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones');

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .trigger('mouseover')
      .get('[alt=Edit]')
      .click({ force: true });

    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Ryan Milbourne');

    cy.get("[alt='Tori Malcolm'")
      .click()

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Ryan Milbourne");

    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {
    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones');

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Cancel")
      .click();

    cy.contains(".appointment__card--show")
      .should('not.contain', 'Lydia Miller-Jones');
  })

  it("should delete an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .trigger('mouseover')
      .get('[alt=Delete]')
      .click({ force: true });

    cy.contains("Confirm")
      .click();

    cy.contains(".appointment__card--show")
      .should('not.contain', 'Archie Cohen');
  })
});