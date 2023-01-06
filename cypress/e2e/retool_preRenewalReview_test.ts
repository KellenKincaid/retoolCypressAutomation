
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                       HOW TO RUN                                      ///////////
///////////                                                                                       ///////////
/////////// Run: npx cypress open                                                                 ///////////
/////////// Cypress will open and ask you which testing type you want to do. Choose E2E Testing   ///////////
/////////// Cypress will then ask you which browser you'd like to use.       Choose CHROME.       ///////////
/////////// Cypress will then display the your test files. Choose the one you want to run.        ///////////
///////////                                                                                       ///////////
///////////                                     THINGS TO KNOW                                    ///////////
/////////// (1)                                                                                   ///////////
/////////// Before our Cypress tests are able to access Retool web apps, each must first sign in  ///////////
///////////     to a Vouch account with access to Vouch's Retool web apps.                        ///////////
/////////// The Cypress tests will use this Vouch account: qaCypressAutomation@vouch.us           ///////////
/////////// This account's credentials are saved in the EPAD Vault of 1Password and must be       ///////////
///////////     retrieved at runtime because they include a one-time 2FA password that changes    ///////////
///////////     every 10 seconds.                                                                 ///////////
///////////                                                                                       ///////////
/////////// (2)                                                                                   ///////////
/////////// When you run your first test here, it will fail and instead create a config file at:  ///////////
///////////      cypress/utility/config.conf                                                      ///////////
/////////// For the Vouch-account-credential-retrieval to work, you must enter your own 1Password ///////////
///////////     credentials in the aforementioned config file (don't add any extra spaces)        ///////////
/////////// This file is protected by the gitignore so you don't have worry about accidentally    ///////////
///////////     pushing it to the remote repo.                                                    ///////////
/////////// Your own 1Password credentials are necessary to be able to retrieve the credentials   ///////////
///////////     of qaCypressAutomation@vouch.us from 1Password.                                   ///////////
///////////                                                                                       ///////////
///////////                                       PROBLEMS                                        ///////////
///////////                                                                                       ///////////
/////////// Cypress cannot interact with files once the testing has begun. Therefore, all the     ///////////
///////////     Vouch-account-credential-retrieval stuff must happen at the moment Cypress open.  ///////////
/////////// This was achieved by putting all of that functionality in cypress.config.ts and       ///////////
///////////     assigning the result to this environment variable:                                ///////////
///////////     Cypress.env().CYPRESS_VOUCH_ACCOUNT_CREDS                                         ///////////
/////////// There are 2 big problems with retrieving the credentials this way:                    ///////////
///////////     1: The one-time password (used for 2FA) expires after a few seconds, which means  ///////////
///////////         reruns are not really possible. You'll have to close Cypress and re-open it.  ///////////
///////////         to rerun a test. Tedious but doable.                                          ///////////
///////////     2: Having multiple it() tests is not possible because each one runs in its own    ///////////
///////////         instance. Meaning that only the first instance will be able to sign in        ///////////
///////////         (again, because the one-tine 2FA password will most-likely have expired).     ///////////
///////////         This is unacceptable so i'll be continuing to research alternate ways to have ///////////
///////////         Cypress sign in to it's Vouch account.                                        ///////////
///////////                                                                                       ///////////
///////////                                  POTENTIAL SOLUTIONS                                  ///////////
///////////                                                                                       ///////////
/////////// If the 2FA one-time password isn't absolutely necessary for qaCypressAutomation's,    ///////////
///////////     Vouch account, I might request to have it removed. That would fix problems 1 & 2. ///////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


const ClickNextButton = () => {
    cy.contains('span','Next')
        .parent('button')
        .click();
}

before('Sign in to Google and go to the Retool web app', () => {
    // Get Cypress Vouch account credentials.
    const credsObject:any = Cypress.env().CYPRESS_VOUCH_ACCOUNT_CREDS;

    // Go to google sign in page
    cy.visit('https://accounts.google.com/');

    // Enter email.
    cy.get('input[type="email"]')
        .type(credsObject.email);

    // Click 'Next' buttton.
    ClickNextButton();

    // Enter password.
    cy.get('div[id="password"]')
        .find('input[type="password"]')
        .type(credsObject.password);

    // Click 'Next' button.
    ClickNextButton();

    // Enter one-time password password.
    cy.contains('div', 'Enter code')
        .parent('div')
        .find('input[type="tel"]')
        .type(credsObject.oneTimePassword);

    // Click 'Next' button.
    ClickNextButton();
})
//////  //////////////  //////
////// SIGN-IN COMPLETE //////
//////////////////////////////

const baseUrl = "https://retool.vouch-stg.us/";
const url = `${baseUrl}apps/Pre-Renewals%20Queue/Pre-Renewals%20Queue`;
const text = "eng"
// const urlQuery = `#filterCompany=${text}&filterDate=CURRENT`

before('Navigate to the Retool Web App', () => {
    cy.visit(url);
})

describe('Search for a word and verify that the first search result contains that word', () => {
    it("Ensure we are on the Retool Pre-Renewal Review web app. Then interact with an element.", {baseUrl : baseUrl}, () => {
        cy.origin(url, {args: {url, text}}, ({url, text}) => {
            // Verify that we are on the correct url before proceeding.
            cy.contains('h1', 'Pre-Renewal Review');
            cy.url().should('contain', url);  

            // Type the desired text in the Search field.
            cy.get('input[placeholder="Search by Company Name or ID"]')
                .type(text);

            // Verify that all rows (on the 1st page) that appear have a Company Name that contains the desired text. (fails if no rows appear.)
            cy.get('div[role="rowgroup"]').then(rows => {
                for (let i = 1; i < rows.length; i++) { // NOTE: We start at row 1 because row 0 is the header row.
                    cy.wrap(rows)
                        .eq(i)
                        .find('span') // Each cell contains a span with that cell's text.
                        .first() // NOTE: First column is for Company Name
                        .should(($element) => {
                            // Case-insensitive comparison for convenience.
                            const elementText = $element.text().toLowerCase();
                            const desiredText = text.toLowerCase();
                            expect(elementText).to.contain(desiredText);
                        });
                }
            })     
        })
    })

})

