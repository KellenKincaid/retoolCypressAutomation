import { execSync } from "child_process";
import { unlinkSync, readFileSync, existsSync } from 'fs';

type _1PasswordCreds = {
  email:string,
  password:string,
  oneTimePassword:string
}

const GetCypressVouchAccountCredentials = ():_1PasswordCreds => {
    let credsObject:_1PasswordCreds = {email:"", password:"", oneTimePassword:""};
    const temporaryFileName:string = "__tempCredsFile.txt";
    const shellScriptPath:string = `cypress/utility/getCreds.sh ${temporaryFileName}`;

    try {
        // Get the creds for the Cypress Vouch account (they'll be stored in a temporary file, which will be deleted right after this script retrieves the creds from it.)
        execSync(shellScriptPath, {stdio:"inherit"}); // Need to use 'inherit', otherwise the temp file (__tempCredsFile.txt) wont get created for some reason.

        // Retrieve creds for the Cypress Vouch account from the temporary file that we just created.
        const credsArray:string[] = readFileSync(temporaryFileName).toString().split(" ").map(item => item.replace(/\r?\n|\r/g, "")); // Split on a space and remove all newline and carriage return characters.
        credsObject = {email : credsArray[0], password : credsArray[1], oneTimePassword : credsArray[2]}

        // Delete the temporary file.
        unlinkSync(temporaryFileName);
    } catch (e) {
        // If there are any errors above, the temporary file will still be deleted.
        if (existsSync(temporaryFileName)) {
            unlinkSync(temporaryFileName);
        }
    }

    return credsObject;
}

const credsObject:_1PasswordCreds = GetCypressVouchAccountCredentials();


////////////////////////////////////////////////////////////
module.exports = {
  projectId: 'gwph8y',
  waitForAnimations: true,
  watchForFileChanges: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 60000,
  target: 'node',
  experimentalSessionAndOrigin: true,
  viewportWidth: 1536,
  viewportHeight: 960,
  env: {
    CYPRESS_VOUCH_ACCOUNT_CREDS: credsObject
  },
  e2e: {
    setupNodeEvents(on:any, config:any) {
    //   // on('before:run', (details) => {
        
    //   // })

    //   // on('after:run', (details) => {

    //   // })
      return require('./cypress/plugins/index.ts')(on, config);
    },
    specPattern: './cypress/e2e//**/*.{js,jsx,ts,tsx}',
  },
}
