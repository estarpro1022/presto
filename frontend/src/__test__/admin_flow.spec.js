describe('Admin UI happy path', () => {
  beforeEach(() => {
    // 在每个测试用例之前访问应用的登录页面
    cy.visit('/login');
  });

  it('should register successfully', () => {
    cy.get('input[name="username"]').type('adminUser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Welcome, adminUser').should('be.visible');
  });

  it('should create a new presentation successfully', () => {
    cy.get('button').contains('Create New Presentation').click();
    cy.get('input[name="presentationName"]').type('New Presentation');
    cy.get('button[type="submit"]').contains('Create').click();
    cy.contains('New Presentation').should('be.visible');
  });

  it('should update the thumbnail and name of the presentation successfully', () => {
    cy.get('button').contains('Edit').click();
    cy.get('input[name="thumbnail"]').attachFile('path/to/thumbnail.jpg');
    cy.get('input[name="presentationName"]').clear().type('Updated Presentation');
    cy.get('button[type="submit"]').contains('Save').click();
    cy.contains('Updated Presentation').should('be.visible');
  });

  it('should add slides to the slideshow successfully', () => {
    cy.get('button').contains('Add Slide').click();
    cy.get('textarea[name="slideContent"]').type('Slide Content');
    cy.get('button[type="submit"]').contains('Add').click();
    cy.contains('Slide Content').should('be.visible');
  });

  it('should switch between slides successfully', () => {
    cy.get('.slide-thumbnail').eq(1).click();
    cy.get('.slide-content').should('contain.text', 'Slide Content');
  });

  it('should delete a presentation successfully', () => {
    cy.get('button').contains('Delete').click();
    cy.get('button').contains('Confirm').click();
    cy.contains('New Presentation').should('not.exist');
  });

  it('should log out successfully', () => {
    cy.get('button').contains('Logout').click();
    cy.contains('Login').should('be.visible');
  });

  it('should log back into the application successfully', () => {
    cy.get('input[name="username"]').type('adminUser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('Welcome, adminUser').should('be.visible');
  });
});
