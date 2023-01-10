/**
 *
 * - Login spec
 *
 *  - should display login page correctly
 *  - should display alert when email is empty
 *  - should display alert when password is empty
 *  - should display alert when email and password is wrong
 *  - should Button Logout on Profile Page when login is correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('cok@gmail.com');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password is wrong', () => {
    cy.get('input[placeholder="Email"]').type('ngasalndess@gmail.com');
    cy.get('input[placeholder="Password"]').type('ngasalndess123');

    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should Button Logout on Profile Page when login is correct', () => {
    cy.get('input[placeholder="Email"]').type('cok@gmail.com');
    cy.get('input[placeholder="Password"]').type('cok123');

    cy.get('button').contains(/^Masuk$/).click();

    cy.get('button').contains(/^Logout$/).should('be.visible');
  });
});
