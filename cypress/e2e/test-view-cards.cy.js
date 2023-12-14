describe('Show 3 cards test', () => {
  it('shows 3 cards in "top challenges"', () => {
    cy.visit('127.0.0.1:5500/index.html');
    cy.get('.rooms__box').should('have.length', 3);
  })
})

describe('Show 30 cards test', () => {
  it('shows 30 cards in "challenges"', () => {
    cy.visit('127.0.0.1:5500/challenges.html');
    cy.get('.rooms__box').should('have.length', 30);
  })
})

describe('Open modal test', () => {
  it('book button opens modal', () => {
    cy.visit('127.0.0.1:5500/index.html');
    cy.get('.rooms__button').first().click();
  })
})





