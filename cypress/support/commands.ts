/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//

Cypress.Commands.add("ClickNextButton", () => {
    cy.contains('span','Next')
        .parent('button')
        .click();
})

Cypress.Commands.add("SignInToGoogleAccount", (credsObject:any) => {
    // Get Cypress Vouch account credentials.
    // const credsObject:any = Cypress.env().CYPRESS_VOUCH_ACCOUNT_CREDS;
    // let credsObject:any;
    // cy.task('GetCypressVouchAccountCredentials').then((result) => {credsObject = result;})

    // Go to google sign in page
    cy.visit('https://accounts.google.com/');

    // Enter email.
    cy.get('input[type="email"]')
        .type(credsObject.email);

    // Click 'Next' buttton.
    cy.ClickNextButton();

    // Enter password.
    cy.get('div[id="password"]')
        .find('input[type="password"]')
        .type(credsObject.password);

    // Click 'Next' button.
    cy.ClickNextButton();

    // Enter one-time password password.
    cy.contains('div', 'Enter code')
        .parent('div')
        .find('input[type="tel"]')
        .type(credsObject.oneTimePassword);

    // Click 'Next' button.
    cy.ClickNextButton();

    // Error-handling
    cy.origin('https://myaccount.google.com', () => {
        cy.on('uncaught:exception', (e) => {
            if (e.message.includes('Things went bad')) {
                 // we expected this error, so let's ignore it and let the test continue 
                 return false
            } 
        }) 
    })
})

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }