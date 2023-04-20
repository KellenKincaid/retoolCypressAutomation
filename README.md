# Retool Cypress Automation
#### Author: Kellen Kincaid, Senior SDET

###### NOTE
This project is intended to use Cypress to streamline the test automation of Retool web apps.

### HOW TO RUN                                      
                                                                                       
- In the terminal, navigate to the root of this project and run this command: 
**npx cypress open**                             

- Cypress will open and ask you which testing type you want to do. Choose *E2E Testing*
- Cypress will then ask you which browser you'd like to use. Choose *CHROME* 
- Cypress will then display the your test files. Choose the one you want to run.        
                                                                                       
### BACKGROUND                                                                            
- Before our Cypress tests are able to access Retool web apps, each must first sign in to a Vouch account with access to Vouch's Retool web apps.                        
- The Cypress tests will use this Vouch account: **qaCypressAutomation@vouch.us**     
- This account's credentials are saved in the EPAD Vault of 1Password and must be retrieved at runtime because they include a one-time 2FA password that changes every 10 seconds.                                                                 
                                                   
- When you run your first test here, it will fail and automatically create a config file at: **cypress/utility/config.conf**                                                     
- For the retrieval of the Vouch account credentials to work, you must enter your own 1Password credentials in the aforementioned config file.
-- Don't add any extra spaces.       
- This file is protected by the gitignore so you don't have worry about accidentally pushing it to the remote repo.  
- The .censitive file hides the password and secret key that you type in the config file.  
-- This relies on the Censitive VS Code extension.                               
                                                                                       



