describe('Subreddit Switching via Custom Dropdown', () => {
    it('loads posts for the selected subreddit', () => {
        cy.visit('/');

        // Click to open dropdown
        cy.get('.dropdown-toggle').click();

        // Click on the desired subreddit
        cy.contains('.dropdown-item', 'r/reactjs').click();

        // Wait for content to load
        cy.get('.subreddit-title', { timeout: 8000 }).should(
            'contain.text',
            'r/reactjs'
        );

        // Confirm posts are rendered
        cy.get('.post-card').should('exist');
    });
});
  