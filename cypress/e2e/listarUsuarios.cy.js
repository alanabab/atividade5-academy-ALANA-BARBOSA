const baseUrl = 'https://rarocrud-frontend-88984f6e4454.herokuapp.com';

describe('Testes de Listar Usuários', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit('/users')
  });

  it('Deve existir uma opção para cadastro de novo usuário quando a lista estiver vazia', () => {
    cy.intercept('GET', 'api/v1/users', {
      statusCode: 200,
      body: []
    }).as('userList');

    cy.wait('@userList');
    cy.get('h3').should('have.text', 'Ops! Não existe nenhum usuário para ser exibido.');
    cy.get('p').should('have.text', 'Cadastre um novo usuário');

    cy.get('.sc-bmzYkS.dmSxaj').should('be.visible').click(); //redireciona para a página de cadastro de usuário
    cy.url().should('equal', baseUrl + '/users/novo')
  });
  
  it('Deve exibir a lista com todos os usuários cadastrados', () => {
    cy.intercept('GET', 'api/v1/users', {
      fixture: "userList.json",
    }).as('userList');

    cy.wait('@userList');

    cy.get('#listaUsuarios').should('be.visible');
    cy.get('#paginacaoAtual').should('have.text', '1 de 3')
  });
   
  it('Deve passar para a próxima página da lista', () => {
    cy.intercept('GET', 'api/v1/users', {
      fixture: "userList.json",
    }).as('userList');

    cy.wait('@userList');

    cy.get('#listaUsuarios').should('be.visible');
    cy.get('#paginacaoAtual').should('have.text', '1 de 3');

    cy.wait(500);
    cy.get('#paginacaoProximo').click();
    cy.get('#paginacaoAtual').should('have.text', '2 de 3');
    
    cy.wait(500);
    cy.get('#paginacaoProximo').click();
    cy.get('#paginacaoAtual').should('have.text', '3 de 3')
  });

  it('Deve verificar informações do primeiro usuário da lista', () => {
    cy.intercept('GET', 'api/v1/users', {
      fixture: "userList.json",
    }).as('userList');

    cy.wait('@userList');

    cy.get('#listaUsuarios').should('be.visible');
    cy.get('.sc-hzhJZQ').first().click();
    cy.get('[name="id"]').should('be.visible');
    cy.get('#userName').should('be.visible');
    cy.get('#userEmail').should('be.visible')
  })  
})