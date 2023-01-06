"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const GetCypressVouchAccountCredentials = () => {
    let credsObject = { email: "", password: "", oneTimePassword: "" };
    const temporaryFileName = "__tempCredsFile.txt";
    const shellScriptPath = `cypress/utility/getCreds.sh ${temporaryFileName}`;
    try {
        (0, child_process_1.execSync)(shellScriptPath, { stdio: "inherit" });
        const credsArray = (0, fs_1.readFileSync)(temporaryFileName).toString().split(" ").map(item => item.replace(/\r?\n|\r/g, ""));
        credsObject = { email: credsArray[0], password: credsArray[1], oneTimePassword: credsArray[2] };
        (0, fs_1.unlinkSync)(temporaryFileName);
    }
    catch (e) {
        if ((0, fs_1.existsSync)(temporaryFileName)) {
            (0, fs_1.unlinkSync)(temporaryFileName);
        }
    }
    return credsObject;
};
const url = 'https://retool.vouch-stg.us/apps/Pre-Renewals%20Queue/Pre-Renewals%20Queue';
describe('PROOF OF CONCEPT - Testing Retool web app', () => {
    beforeEach('Sign in to Google and go to the Retool web app', () => {
        const credsObject = GetCypressVouchAccountCredentials();
        cy.visit('https://accounts.google.com/');
        cy.get('input[type="email"]')
            .type(credsObject.email);
        cy.get('span')
            .should('contain', 'Next')
            .parents('button')
            .click();
        cy.get('input[type="password"]')
            .type(credsObject.password);
        cy.get('span')
            .should('contain', 'Next')
            .parents('button')
            .click();
        cy.get('input[type="tel"]')
            .type(credsObject.oneTimePassword);
        cy.get('span')
            .should('contain', 'Next')
            .parents('button')
            .click();
        cy.visit(url);
    });
    it("Go to Retool Pre-Renewal Review web app", () => {
        cy.contains('h1', 'Pre-Renewal Review');
        cy.url().should('eq', url);
    });
    it("Type 'Vouch' in the Search field", () => {
        const text = 'Vouch';
        cy.get('input[placeholder="Search by Company Name or ID"]')
            .type(text);
        let row0CompanyName = "";
        cy.get('div[role="row"]')
            .contains('class', 'table-row').then(row => {
            row0CompanyName = row.find('div[tabindex="0"]')
                .find('span')
                .text();
        });
        if (row0CompanyName !== "") {
            cy.wrap(row0CompanyName).should('contain', text);
        }
        else {
            return false;
        }
    });
});
