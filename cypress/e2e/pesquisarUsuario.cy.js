import {faker} from '@faker-js/faker';
import CadastroPage from "../support/pages/cadastro.page";

describe('Testes de pesquisar usuário', () => {
  
  var paginaCadastro = new CadastroPage();
  const name = faker.person.firstName();
  const email = faker.string.alpha(12).toLowerCase() + "@oi.com";
  
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit('/users')
  });
  
  before(() => { //cria um usuário a ser utilizado nos testes de pesquisa
    cy.visit('/users/novo');
    cy.intercept("POST", "/api/v1/users").as("postUser");

    cy.get(paginaCadastro.inputName).type(name);
    cy.get(paginaCadastro.inputEmail).type(email);
    cy.get(paginaCadastro.buttonSalvar).click();
    
    cy.wait("@postUser");
    cy.contains("Usuário salvo com sucesso!").should("exist")
  });
  
  it('Deve permitir pesquisar usuário por nome', () => {
    cy.get('.sc-gsFSXq.mUpIH').type(name);
    cy.wait(1000);
    cy.get('.sc-fHjqPf.dLIfot').invoke('text').should('contain', name);
    cy.get('.sc-fHjqPf.dLIfot').invoke('text').should('contain', email)
  });
   
  it('Deve permitir pesquisar usuário por email', () => {
    cy.get('.sc-gsFSXq.mUpIH').type(email);
    cy.wait(1000);
    cy.get('.sc-fHjqPf.dLIfot').invoke('text').should('contain', name);
    cy.get('.sc-fHjqPf.dLIfot').invoke('text').should('contain', email)
  });

  it('Deve visualizar detalhes do usuário pesquisado', () => {
    cy.get('.sc-gsFSXq.mUpIH').type(email); //busca o usuário por email
    cy.wait(1000);
    cy.get('.sc-fHjqPf.dLIfot').invoke('text').should('contain', name);
    cy.get('.sc-fHjqPf.dLIfot').invoke('text').should('contain', email);
    cy.get('.sc-hzhJZQ').first().click(); //clica em Ver detalhes do usuário
    cy.wait(2000);
    cy.get('[name="id"]').should('be.visible'); //infos do usuário são exibidas
    cy.get('#userName').should('be.visible');
    cy.get('#userEmail').should('be.visible')
  });  
  
  it('Deve retornar lista vazia ao pesquisar nome não cadastrado', () => {
    cy.intercept('GET', 'api/v1/users', {
      statusCode: 200,
      body: []
    }).as('userList');

    cy.wait('@userList');
    cy.get('.sc-gsFSXq.mUpIH').type('Usuario Inexistente');
    cy.wait(1000);
    cy.get('h3').should('have.text', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.get('p').should('have.text', 'Cadastre um novo usuário')
  });
  
  it('Deve retornar lista vazia ao pesquisar email não cadastrado', () => {
    cy.intercept('GET', 'api/v1/users', {
      statusCode: 200,
      body: []
    }).as('userList');

    cy.wait('@userList');
    cy.get('.sc-gsFSXq.mUpIH').type('email@inexistente.com');
    cy.wait(1000);
    cy.get('h3').should('have.text', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.get('p').should('have.text', 'Cadastre um novo usuário')
  })
})