describe('Header Component', () => {
  // Test for non-authenticated user
  describe('When user is not authenticated', () => {
    beforeEach(() => {
      // Mock the session to be null
      cy.intercept('GET', '/api/auth/session', { body: { user: null } }).as('getSession');
      cy.visit('/');
      cy.wait('@getSession');
    });

    it('should display the logo', () => {
      cy.get('header img[alt="Cescendo Cloud Logo"]').should('be.visible');
    });

    it('should display navigation links for non-authenticated users', () => {
      cy.get('header .hidden.md\\:flex a').should('have.length.at.least', 1);
      // You can add more specific checks for your navList items here
    });

    it('should display Sign In button', () => {
      cy.get('header button').contains('Sign In').should('be.visible');
    });
  });

  // Test for authenticated user
  describe('When user is authenticated', () => {
    beforeEach(() => {
      // Mock the session to include a user
      cy.intercept('GET', '/api/auth/session', {
        body: {
          user: {
            name: 'Test User',
            email: 'test@example.com'
          },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      }).as('getSession');
      cy.visit('/dashboard');
      cy.wait('@getSession');
    });

    it('should display dashboard navigation links', () => {
      cy.get('header .hidden.md\\:flex a').should('have.length.at.least', 1);
      // You can add more specific checks for your dashBoardNavList items here
    });

    it('should display Tools dropdown', () => {
      cy.get('header button').contains('Tools').should('be.visible');
    });

    it('should display Sign Out button', () => {
      cy.get('header button').contains('Sign Out').should('be.visible');
    });

    it('should navigate to correct page when selecting a tool', () => {
      cy.get('header button').contains('Tools').click();
      cy.get('[role="menu"] [role="menuitem"]').contains('Search Student').click();
      cy.url().should('include', '/dashboard/searchStudent');
    });
  });

  // Test for active link highlighting
  describe('Active link highlighting', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/auth/session', { body: { user: null } }).as('getSession');
    });

    it('should highlight the active link', () => {
      // Visit a specific page
      cy.visit('/services'); // Replace with an actual route from your navList
      cy.wait('@getSession');

      // Check if the corresponding link has the active class
      cy.get('header .hidden.md\\:flex a.active').should('exist');
    });
  });
});