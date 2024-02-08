const submitBtn = document.querySelector('#submit');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

function blockButton(btn) {
    btn.disabled = true;
    btn.classList.add('error');
}

function unblockButton(btn) {
    btn.disabled = false;
    btn.classList.remove('error');
}

function clearError(...elements) {
    unblockButton(submitBtn);

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
    blockButton(submitBtn);

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

function displayErrMessage(element, message) {
    raiseError(element); 
    element.textContent = message;
}

function clearErrMessage(element) {
    clearError(element);
    element.textContent = '';
}

function validatePassword() {
    const infoBox = document.querySelector('#password+div.info');
    clearSuccess(confirmPassword);

    if(!password.value) {
        raiseError(password);

        const message = 'Please provide a password';
        displayErrMessage(infoBox, message)
        return;
    }

    raiseSuccess(password);
    clearErrMessage(infoBox);

    if(confirmPassword.value) {
        comparePassword();
    }
}

function comparePassword() {
    if (!password.value) {
        validatePassword();
        return;
    }

    const infoBox = document.querySelector('#confirm-password+div.info');
    if(password.value !== confirmPassword.value) {
        raiseError(confirmPassword);

        const message = 'Please repeat the provided password';
        displayErrMessage(infoBox, message);
        return;
    }

    raiseSuccess(confirmPassword);
    clearErrMessage(infoBox);
}

function setupFormInput() {
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', comparePassword); 
}

setupFormInput();