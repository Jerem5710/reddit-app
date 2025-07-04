describe('Post Detail View', () => {
    it('can navigate to a post and load comments', () => {
        cy.visit('/');

        // Wait for post cards to load
        cy.get('.post-card', { timeout: 8000 }).should('exist');

        // Click the "X comments" link on the first visible post
        cy.get('.comment-link').first().click();
        

        // Assert that URL contains /comments/
        cy.url().should('include', '/comments/');

        // Confirm the post content is loaded
        cy.get('.post-detail h2').should('exist'); // Post title
        cy.contains(/Posted by u\//).should('exist');

        // Confirm comments are loading or loaded
        cy.get('.loading-text, .comment').should('exist');
    });
})
  