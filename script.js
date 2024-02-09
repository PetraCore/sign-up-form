const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

function clearError(...elements) {
    elements.forEach(element => {
        element.classList.remove('error'); 
    });
}

function clearSuccess(...elements) {
    elements.forEach(element => {
        element.classList.remove('success'); 
    });
}

function raiseError(...elements) {
    clearSuccess(...elements);
    elements.forEach(element => {
        element.classList.add('error'); 
    });
}

function raiseSuccess(...elements) {
    clearError(...elements);
    elements.forEach(element => {
        element.classList.add('success'); 
    });
}

function getClosestSibling(element, reqClass = null) {
    let currentElement = element.nextElementSibling;

    while (currentElement) {
        if(currentElement.classList.contains(reqClass) || !reqClass) {
            return currentElement;
        }
        currentElement = currentElement.nextElementSibling;
    }

    if (!currentElement) {
        currentElement = element.previousElementSibling;

        while (currentElement) {
            if(currentElement.classList.contains('info') || !reqClass) {
                return currentElement;
            }
            currentElement = currentElement.previousElementSibling;
        }
    }

    return null;
}

function displayErrMessage(element, message) {

    const infoBox = getClosestSibling(element, 'info')

    if (!infoBox) {
        console.error(`Cannot display message:
        Could not find sibling with class .info for element ${element}`);
        return;
    }

    raiseError(infoBox); 
    infoBox.textContent = message;
}

function clearErrMessage(element) {

    const infoBox = getClosestSibling(element, 'info')

    if (!infoBox) {
        console.error(`Cannot clear message:
        Could not find sibling with class .info for element ${element}`);
        return;
    }

    clearError(infoBox);
    infoBox.textContent = '';
}

function validatePassword() {
    clearSuccess(confirmPassword);

    if(!password.value) {
        raiseError(password);

        const message = 'Please provide a password';
        displayErrMessage(password, message)
        return;
    }

    if(password.validity.tooShort) {
        raiseError(password);

        const message = `Password should be at least ${password.minLength} characters long`;
        displayErrMessage(password, message);
        return;
    }

    if(password.validity.tooLong) {
        raiseError(password);

        const message = `Please shorten the password to ${password.maxLength} characters`;
        displayErrMessage(password, message);
        return;
    }

    raiseSuccess(password);
    clearErrMessage(password);

    if(confirmPassword.value) {
        comparePassword();
    }
}

function comparePassword() {
    if (!password.value) {
        validatePassword();
        return;
    }

    if(password.value !== confirmPassword.value) {
        raiseError(confirmPassword);

        const message = 'Please repeat the password';
        confirmPassword.setCustomValidity(message + '.');
        displayErrMessage(confirmPassword, message);
        return;
    }

    if(confirmPassword.validity.tooShort || confirmPassword.validity.tooLong) {
        raiseError(confirmPassword);
        return;
    }

    raiseSuccess(confirmPassword);
    confirmPassword.setCustomValidity('');
    clearErrMessage(confirmPassword);
}

function setupFormInput() {
    const firstName = document.querySelector('#first-name');
    const lastName = document.querySelector('#last-name');
    const email = document.querySelector('#email');
    const phoneNumber = document.querySelector('#phone-number');

    firstName.addEventListener('blur', () => {
        if(!firstName.validity.valid) {
            raiseError(firstName);
            displayErrMessage(firstName, 'Please provide your name');
            return;
        }
        raiseSuccess(firstName);
        clearErrMessage(firstName);
    });

    lastName.addEventListener('blur', () => {
        if(!lastName.validity.valid) {
            raiseError(lastName);
            displayErrMessage(lastName, 'Please provide your last name');
            return;
        }
        raiseSuccess(lastName);
        clearErrMessage(lastName);
    });

    email.addEventListener('blur', () => {
        if(email.validity.valid) {
            raiseSuccess(email);
            clearErrMessage(email);
            return;
        }
        raiseError(email);

        if(email.validity.valueMissing) {
            displayErrMessage(email, 'Please provide your email');
            return;
        }

        if(email.validity.typeMismatch) {
            displayErrMessage(email, 
            'Please enter a valid email address');
            return;
        }
    });

    phoneNumber.addEventListener('blur', () => {
        if(!phoneNumber.value) {
            clearSuccess(phoneNumber);
            return;
        }
        raiseSuccess(phoneNumber);
    });

    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', comparePassword); 
}

setupFormInput();