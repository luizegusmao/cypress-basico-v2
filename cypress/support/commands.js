Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Luize')
    cy.get('#lastName').type('Gusmão')
    cy.get('#email').type('luizegusmao@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    


})