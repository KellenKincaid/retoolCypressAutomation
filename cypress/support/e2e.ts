// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands.ts'

// Alternatively you can use CommonJS syntax:
// require('./commands')


// Bug-Fix: Prevents the 'ResizeObserver loop limit exceeded' error.
// const resizeObserverLoopErrRe = "ResizeObserver loop limit exceeded"
// const thingsWentBadErrRe = "Things went bad"
// Cypress.on('uncaught:exception', (err:any) => {
//     /* returning false here prevents Cypress from failing the test */
//     // if (err.message.includes(resizeObserverLoopErrRe) || err.message.includes(thingsWentBadErrRe) /*resizeObserverLoopErrRe.test(err.message) || thingsWentBadErrRe.test(err.message)*/) {
//     //     return false
//     // } 
// })

// ignore uncaught exceptions --- (NOT WORKING FOR: "ResizeObserver loop limit exceeded" error)
Cypress.on('uncaught:exception', (err) => {
    return false
})

// // patch Cypress top.onerror
// Object.defineProperty(top, 'onerror', {
//     value: window.onerror,
// })
