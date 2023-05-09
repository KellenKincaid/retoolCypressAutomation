#! /bin/bash

CONFIG_FILE=cypress/utility/config.conf

if [ -e $CONFIG_FILE ] # If the config.conf file exists...
then
    TEMPORARY_FILE_NAME=$1

    _1PASSWORD_EMAIL=""
    _1PASSWORD_SECRET_KEY=""
    _1PASSWORD_PASSWORD=""

    while read line
    do
        variableName=$(echo "$line" | cut -d "=" -f 1)
        variableValue=$(echo "$line" | cut -d "=" -f 2)

        if [[ $variableName == "_1PASSWORD_EMAIL" ]]
        then
            _1PASSWORD_EMAIL=$variableValue
        elif [[ $variableName == "_1PASSWORD_SECRET_KEY" ]]
        then
            _1PASSWORD_SECRET_KEY=$variableValue
        elif [[ $variableName == "_1PASSWORD_PASSWORD" ]]
        then
            _1PASSWORD_PASSWORD=$variableValue
        fi
    done < ./cypress/utility/config.conf

    expect ./cypress/utility/signInTo1Password.exp $_1PASSWORD_EMAIL $_1PASSWORD_SECRET_KEY $_1PASSWORD_PASSWORD $TEMPORARY_FILE_NAME
else
    # Create config.conf and prompt the user to fill it out and try again.
    echo "CONFIG FILE DID NOT EXIST - (${CONFIG_FILE})"
    
    echo "CREATING CONFIG FILE..."
    touch $CONFIG_FILE
    echo "_1PASSWORD_EMAIL=" >> $CONFIG_FILE
    echo "_1PASSWORD_SECRET_KEY=" >> $CONFIG_FILE
    echo "_1PASSWORD_PASSWORD=" >> $CONFIG_FILE
    echo "CONFIG FILE CREATED!"

    echo "!!! YOU MUST FILL OUT THE CONFIG FILE - (${CONFIG_FILE})"
fi
