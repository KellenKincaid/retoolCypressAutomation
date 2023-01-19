/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// FOR SOME REASON, This breaks Cypress namespace stuff at the bottom of this file.
// SOLUTION: Use require() instead. Works!
// import { execSync } from "child_process";
// import { unlinkSync, readFileSync, existsSync } from 'fs';

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on:any, config:any) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    // on('before:browser:launch', (browser:any = {}, launchOptions:any) => {
    //     if (browser.family === 'chromium' && browser.name !== 'electron') {
    //         launchOptions.args.push("--incognito");                
    //         return launchOptions
    //     }

    //     if (browser.name === 'electron') {                
    //         launchOptions.preferences.incognito = true               
    //         return launchOptions
    //     }
    // }) 

    on('task', {
        GetCypressVouchAccountCredentials() {
            const child_process = require('child_process');
            const fs = require('fs');

            type _1PasswordCreds = {
                email:string,
                password:string,
                oneTimePassword:string
            }

            let credsObject:_1PasswordCreds = {email:"", password:"", oneTimePassword:""};
            const temporaryFileName:string = "__tempCredsFile.txt";
            const shellScriptPath:string = `cypress/utility/getCreds.sh ${temporaryFileName}`;

            try {
                // Get the creds for the Cypress Vouch account (they'll be stored in a temporary file, which will be deleted right after this script retrieves the creds from it.)
                child_process.execSync(shellScriptPath, {stdio:"inherit"}); // Need to use 'inherit', otherwise the temp file (__tempCredsFile.txt) wont get created for some reason.

                // Retrieve creds for the Cypress Vouch account from the temporary file that we just created.
                let credsArray:string[] = fs.readFileSync(temporaryFileName).toString().split(" "); // Split on a space
                credsArray = credsArray.map(item => item.replace(/\r?\n|\r/g, "")); // Remove all newline and carriage return characters.
                credsObject = {email : credsArray[0], password : credsArray[1], oneTimePassword : credsArray[2]}

                // Delete the temporary file.
                fs.unlinkSync(temporaryFileName);
            } catch (e) {
                // If there are any errors above, the temporary file will still be deleted.
                if (fs.existsSync(temporaryFileName)) {
                    fs.unlinkSync(temporaryFileName);
                }
            }

            return credsObject;
        }
    })


}

declare namespace Cypress {
    interface Chainable<Subject = any> {
        ClickNextButton(): Chainable<any>;
        SignInToGoogleAccount(credsObject:any): Chainable<any>;
    }
}
  