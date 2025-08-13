describe('template spec', () => {
  it('loads the landing page', () => {
    cy.visit('/');
  })

  it('contains a header and footer with nav links', () => {
    cy.visit('/')
    cy.wait(5000);
    // header exists
    cy.get('header').should('exist')
    // navbar exists
    cy.get('nav').should('exist')
    // navbar menu exists
    cy.get("ul").children().find("a").should("have.length", 2)
    cy.get('footer').should('exist')

  })

  it("contains login button", () => {
    cy.visit("/");
    cy.wait(5000);
    cy.get("button").contains("Sign In");
  })

  it("contains 5 images in the main section", () => {
    cy.visit("/");
    cy.wait(5000);
    cy.get('main').children().find("img").should("have.length", 5);
  })

})
   