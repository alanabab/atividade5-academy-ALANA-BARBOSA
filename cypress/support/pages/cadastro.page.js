export default class CadastroPage {
    inputName = '#name';
    inputEmail = '#email';
    buttonLimpar = '[data-test-id="clearButton"]';
    buttonSalvar = 'button[type="submit"]';
  
    linkPaginaUsuarios = '[href="./usuarios.html"]';
    linkPaginaSobre = '[href="./sobre.html"]';
  
    listaUsuarios = '#lista-usuarios'; 

    URL = "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo";

    typeNome(nome) {
      cy.get(this.inputNome).type(nome);
    }
  
    typeEmail(email) {
      cy.get(this.inputEmail).type(email);
    }
  
    clickButtonSalvar() {
      cy.get(this.buttonSalvar).click();
    }
  
    clickButtonLimpar() {
      cy.get(this.buttonLimpar).click();
    }
  
    getListaUsuarios() {
      return cy.get(this.listaUsuarios);
    }
  
    cadastrar(nome, email) {
      this.typeNome(nome);
      this.typeEmail(email);
      this.clickButtonCadastrar();
    }
  }
  