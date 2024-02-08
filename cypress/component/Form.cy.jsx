import Form from '../../src/components/Form';
describe('Form Tests', () => {
  it('should click submit button', () => {
    cy.mount(<Form />);

    cy.get('input[name=firstName]').type('Cagri');
    cy.get('input[name=lastName]').type('Yilmaz');
    cy.get('input[name=email]').type('emre@wit.');
    cy.get('input[name=password]').type('test123456789');

    cy.get('[data-testid=submit-button]').click();

    cy.get('[data-testid=submit-button]').should('disabled');
  });
});
