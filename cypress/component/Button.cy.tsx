import Button from "@/app/components/button/button"
describe('Button.cy.tsx', () => {
  // button functionality
  it('contains the name Click Me', () => {
    cy.mount(<Button name="Click Me" pendingName="Clicked" type="button"/>)
    cy.get('[data-cy="button"').contains("Click Me");
  })

  it("when clicked, onClick should be called", () => {
    cy.mount(<Button name="Click Me" pendingName="Clicked" type="button" onClick={cy.spy().as("onClick")}/>)
    cy.get('[data-cy="button"]').contains("Click Me").click();
    cy.get("@onClick").should("have.been.called");
  })

  it("When isPending is true name should be Clicked", () => {
    cy.mount(<Button name="Click Me" pendingName="Clicked" type="button" isPending={true}/>)
    cy.get("button").contains("Clicked");
  })

  it("When button type is button should have button", () => {
    cy.mount(<Button name="Click Me" pendingName="Clicked" type="button" />)
    cy.get('[data-cy="button"]')
    cy.get('[type="button"]')
  })

  it("When button type is submit should have submit", () => {
    cy.mount(<Button name="Click Me" pendingName="Clicked" type="submit"/>)
    cy.get('[data-cy="submit"]')
    cy.get('[type="submit"]')
  })
})