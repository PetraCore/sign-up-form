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

function validatePassword() {
    if(!password.value) {
        raiseError(password, confirmPassword);
        return;
    }
    if(password.value !== confirmPassword.value) {
        raiseError(password, confirmPassword);
        return;
    }

    raiseSuccess(password, confirmPassword);
}

function setupFormInput() {
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', validatePassword); 
}

setupFormInput();