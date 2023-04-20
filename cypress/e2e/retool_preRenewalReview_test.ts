



/*
    TODO
    
    Figure out how to only have to sign in once.
    I'm thinking I should be able to have the test NOT clear the cookie that is needed to stay signed in.
*/


beforeEach('Sign in to the Google account', () => {
    cy.task('GetCypressVouchAccountCredentials').then((credsObject:any) => {
        cy.SignInToGoogleAccount(credsObject);
    })
})

afterEach('Sign out of the Google account', () => {
    cy.visit('https://mail.google.com/mail/logout')
})



const baseUrl = "https://retool.vouch-stg.us";
const urlExtension = '/apps/Pre-Renewals%20Queue/Pre-Renewals%20Queue'
const url = `${baseUrl}${urlExtension}`;
const text = "eng"
const text2 = "en"

beforeEach('Navigate to the Retool Web App', () => {
    cy.visit(url);
})

describe('Search for a word and verify that the first search result contains that word', () => {
    it("(1) Ensure we are on the Retool Pre-Renewal Review web app. Then interact with an element.", {baseUrl : baseUrl}, () => {
        cy.origin(baseUrl, {args: {url, text, urlExtension}}, ({url, text, urlExtension}) => {
            cy.visit(urlExtension);

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

    it("(2) Ensure we are on the Retool Pre-Renewal Review web app. Then interact with an element.", {baseUrl : baseUrl}, () => {
        cy.origin(baseUrl, {args: {url, text, urlExtension}}, ({url, text, urlExtension}) => {
            cy.visit(urlExtension);

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

