/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


 /////only eu utilizo quando quero rodar apenas um teste especifico
 it('preenche campos obrigatórios e o envio ao formulário', function() {
   const longText = 'teste long teste,teste,tese teste,teste,tese'
    cy.get('#firstName')
    .should('be.visible')
    .type('Luize')
    .should('have.value', 'Luize')

    cy.get('#lastName')
    .should('be.visible')
    .type('Gusmão')
    .should('have.value', 'Gusmão')


    cy.get('#email')
    .should('be.visible')
    .type('luizegusmao@gmail.com')
    .should('have.value', 'luizegusmao@gmail.com')

    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

  }) 
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function (){
    cy.get('#firstName').type('Luize')
    cy.get('#lastName').type('Gusmão')
    cy.get('#email').type('luizegusmaogmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  }) 
  it('valida que serão aceitos somente números no campo telefone', function (){
    cy.get('#phone')
     .type('luize')
     .should('have.value', '')   
  }) 

  it('valida que o campo telefone torna-se obrigatório ao preencher o ckeck de telefone', function (){
    cy.get('#firstName').type('Luize')
    cy.get('#lastName').type('Gusmão')
    cy.get('#email').type('luizegusmaogmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  }) 
   it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
     .type('Luize')
     .should('have.value', 'Luize')
     .clear()
     .should('have.value', '')
    cy.get('#lastName')
     .type('Gusmão')
     .should('have.value', 'Gusmão')
     .clear()
     .should('have.value', '')
    cy.get('#email')
     .type('luizegusmao@gmail.com')
     .should('have.value', 'luizegusmao@gmail.com')
     .clear()
     .should('have.value', '')
    cy.get('#phone') 
     .type('489998613264')
     .should('have.value', '489998613264')
     .clear()
     .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
 })
 
 it('envia o formuário com sucesso usando um comando customizado', function(){
   cy.fillMandatoryFieldsAndSubmit()

   cy.get('.success').should('be.visible')

 })

 it('seleciona um produto (YouTube) por seu texto', function(){
  cy.get('#firstName').type('Luize')
  cy.get('#lastName').type('Gusmão')
  cy.get('#email').type('luizegusmao@gmail.com')
  cy.get('#open-text-area').type('teste')
  cy.get('#product').select('YouTube')
  .should('have.value', 'youtube')
  cy.contains('button', 'Enviar').click()
  cy.get('.success').should('be.visible')

})

it('seleciona um produto (Mentoria) por seu valor (value)', function(){
  cy.get('#product')
  .select('mentoria')
  .should('have.value', 'mentoria')
  
})

it('seleciona um produto (Blog) por seu índice', function(){
  cy.get('#product')
  .select(1)
  .should('have.value', 'blog')
  
})

it('marca o tipo de atendimento "Feedback"', function(){
   cy.get('input[type="radio"]')
   .check('feedback')
   .should('have.value', 'feedback')
})

it('marca cada tipo de atendimento', function(){
  cy.get('input[type="radio"]')
  .should('have.length', 3)
  .each (function($radio){
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
  })
  
}) 

it('marca ambos checkboxes, depois desmarca o último', function(){
  cy.get('input[type="checkbox"]')
  .check()
  .last()
  .uncheck()
  .should('not.be.checked')
})

it('exibe mensagem de erro quando o telefone se torna obrigatório', function(){

  cy.get('#firstName').type('Luize')
  cy.get('#lastName').type('Gusmão')
  cy.get('#email').type('luizegusmaogmail.com')
  cy.get('#open-text-area').type('teste')
  cy.get('input[type="checkbox"]')
  .check()
  .first()
  .uncheck()
  cy.get('#phone').type('489996132648')
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
  
})
it('seleciona um arquivo da pasta fixtures', function(){

   cy.get('input[type="file"]')
     .selectFile('cypress/fixtures/example.json')
     .should(function($input){
      //console.log($input) serve para exibir o conteudo na html
      expect($input[0].files[0].name).to.equals('example.json')
     })

})
  it('seleciona um arquivo simulando um drag-and-drop', function (){
    cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){
       expect($input[0].files[0].name).to.equals('example.json')
    })

  })
  
  it('Crie um teste chamado seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile') //.as é o alias, que é outra forma de passar o caminho do arquivo
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equals('example.json')
      })
  }) 
 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
  cy.get('#privacy a').should('have.attr', 'target' ,'_blank')
 })
 it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
  cy.get('#privacy a')
     .invoke ('removeAttr', 'target')
     .click()
  cy.contains ('Talking About Testing') 
    .should('be.visible') 
 })
  it('testa a página da política de privacidade de forma independente', function(){
    cy.visit ('src/privacy.html')
    cy.contains ('Talking About Testing') 
    .should('be.visible') 

  })

})
  