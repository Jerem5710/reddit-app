describe('Enter Subreddit Manually', () => {
    it('navigates and loads posts for a custom subreddit', () => {
        cy.visit('/');

        // Type a subreddit name into the "enter subreddit" input
        cy.get('.subreddit-input').type('webdev');

        // Submit the form
        cy.get('.subreddit-button').click();

        // Assert the heading reflects the new subreddit
        cy.get('.subreddit-title', { timeout: 8000 }).should(
            'contain.text',
            'r/webdev'
        );

        // Confirm posts are displayed
        cy.get('.post-card').should('exist');
    });
});
  