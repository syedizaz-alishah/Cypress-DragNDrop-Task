// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let LOCAL_STORAGE = {};

Cypress.Commands.add('saveLocalStorage', () => {
    Cypress.log({
        message: 'Grabbing local storage and saving to variable.',
        displayName: 'SaveLocal'
    });
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorage', () => {
    Cypress.log({
        message: 'Grabbing local storage variable and setting.',
        displayName: 'SetLocal'
    });
    Object.keys(LOCAL_STORAGE).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE[key]);
    });
});

const email = Cypress.env('email');
const password = Cypress.env('password');

Cypress.Commands.add('login', () => {
    cy.visit('https://react-redux.realworld.io/#/?_k=d2t9lf');
    cy.get('a[href="#login"]').click();
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);
    cy.get('button').click();
});

Cypress.Commands.add('getAndSetToken', () => {
    Cypress.log({
        message: 'Requests token and sets in local storage.',
        displayName: 'GetToken'
    });
    cy.intercept({
        url: 'https://admin-api-dev.social27.com/api/v1.0/events/4126/users/375541',
        method: 'GET',
        body: {
            user: {
                email:'izazshah@social27.com',
                password:'social27'
            }
        }
    }).then(response => {
        localStorage.setItem('authc99d99b308c14900092a80073600e4d5',JSON.stringify(json1))
       localStorage.setItem('authState',JSON.stringify(json2))
    });
});

require('@4tw/cypress-drag-drop')

Cypress.Commands.add("getUnlayerIframe", () => {
    return getIframeBody(".mm-wizard iframe");
  });
  
  Cypress.Commands.add('dropTool', (name) => {
    cy.getUnlayerIframe()
      .find('.blockbuilder-content-tool')
      .contains(name)
      .parents('.blockbuilder-content-tool')
      .trigger('mousedown', { which: 1 })
      .trigger('dragstart', {})
      .trigger('drag', {});
  
    cy.getUnlayerIframe()
      .find('.u_body')
      .trigger('dragover', {})
      .trigger('drop', {})
      .trigger('dragend', {})
      .trigger('mouseup', { which: 1 });
  
    cy.getUnlayerIframe().find('.u_body').trigger('mouseup');
  });