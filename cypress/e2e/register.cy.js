describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="Nama"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.get('button').contains(/^Daftar$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.get('input[placeholder="Nama"]').type('testingsayang');

    cy.get('button').contains(/^Daftar$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Nama"]').type('namakusayang');
    cy.get('input[placeholder="Email"]').type('sayangnamaku@gmail.com');

    cy.get('button').contains(/^Daftar$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display button masuk when register is success', () => {
    const randomNum = +new Date();

    cy.get('input[placeholder="Nama"]').type('cantiksekaliibuku');
    cy.get('input[placeholder="Email"]').type(`ibukucantiksekali${randomNum}@gmail.com`);
    cy.get('input[placeholder="Password"]').type('sekaliibukucantik');

    cy.get('button').contains(/^Daftar$/).click();
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });
});
