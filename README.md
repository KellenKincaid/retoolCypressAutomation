# retoolCypressAutomation
## Author: Kellen Kincaid, Senior SDET

### This project is intended to use Cypress to streamline the test automation of Retool web apps.

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
///////////     credentials in the aforementioned config file (don't add any extra spaces).       ///////////
/////////// This file is protected by the gitignore so you don't have worry about accidentally    ///////////
///////////     pushing it to the remote repo.                                                    ///////////
/////////// Your own 1Password credentials are necessary to be able to retrieve the credentials   ///////////
///////////     of qaCypressAutomation@vouch.us from 1Password.                                   ///////////
///////////                                                                                       ///////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

