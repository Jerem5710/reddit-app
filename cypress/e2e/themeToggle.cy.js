describe('Dark Mode Toggle', () => {
    it('toggles between dark and light mode', () => {
        cy.visit('/');

        // Assert body starts in light mode
        cy.get('body').should('not.have.class', 'dark');

        // Click the toggle button
        cy.get('.dark-toggle').click();

        // Assert body now has dark class
        cy.get('body').should('have.class', 'dark');

        // Toggle back to light mode
        cy.get('.dark-toggle').click();

        cy.get('body').should('not.have.class', 'dark');
    });
});
  