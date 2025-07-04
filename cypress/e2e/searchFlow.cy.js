describe('Search Flow', () => {
    it('can search for posts and see results', () => {
        cy.visit('/');
        cy.get('input[placeholder="Search subreddit..."]').type('react{enter}');
        cy.contains('Results for "react"').should('exist');
        cy.get('.post-card').should('exist'); // assumes posts render with .post-card class
    });
});
  