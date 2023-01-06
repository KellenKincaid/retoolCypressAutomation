// ignore uncaught exceptions
Cypress.on('uncaught:exception', (err:any, runnable:any) => {
    return false
})