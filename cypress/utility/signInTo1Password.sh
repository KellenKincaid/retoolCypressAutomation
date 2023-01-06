#! /bin/bash

_1PASSWORD_ADDRESS="vouchinc.1password.com"
_1PASSWORD_EMAIL=$1
_1PASSWORD_SECRET_KEY=$2
TEMPORARY_FILE_NAME=$3

echo "...SIGNING IN..."
eval $(op account add --signin --address $_1PASSWORD_ADDRESS --email $_1PASSWORD_EMAIL --secret-key $_1PASSWORD_SECRET_KEY)

#######
### password prompt happens here. It should get answered automatically by the expect script (testExpect.exp)
#######

echo "...SIGNED INTO 1PASSWORD..."

echo "...RETRIEVING CREDENTIALS OF THE TEST ACCOUNT..."
# Retrieve the info about the QA Cypress Automation 1Password account so the tests can log in to a Vouch account with access to Retool.
TEST_ACCOUNT_1PASSWORD_USERNAME="qacypressautomation@vouch.us"
TEST_ACCOUNT_1PASSWORD_PASSWORD=$(op item get qacypressautomation@vouch.us --fields label=password)
TEST_ACCOUNT_1PASSWORD_ONE_TIME_PASSWORD=$(op item get qacypressautomation@vouch.us --otp)


# Write the creds to a temporary file. (This file will be automatically deleted.)
echo "....CREATING TEMPORARY FILE TO STORE TEST ACCOUNT CREDS..."
echo "$TEST_ACCOUNT_1PASSWORD_USERNAME $TEST_ACCOUNT_1PASSWORD_PASSWORD $TEST_ACCOUNT_1PASSWORD_ONE_TIME_PASSWORD" > $TEMPORARY_FILE_NAME

# Sign out of 1Password in this command line session.
op signout
echo "...SIGNED OUT OF 1PASSWORD."