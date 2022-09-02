import { getUser, signInUser, signUpUser } from '../fetch-utils.js';

const authHeader = document.getElementById('auth-header');
const authForm = document.getElementById('auth-form');
const authButton = authForm.querySelector('button');
const changeType = authForm.querySelector('a');
const errorDisplay = authForm.querySelector('.error');

const params = new URLSearchParams(location.search);
const redirectUrl = params.get('redirectUrl') || '../';

const user = getUser();
if (user) location.replace(redirectUrl);


const signUpType = {
    header: 'Create a new account',
    button: 'Sign Up',
    prompt: 'Already have an account?',
    action: signUpUser,
};

const signInType = {
    header: '🐾Barkle🐾',
    button: 'Sign In',
    prompt: 'Need to create an account?',
    action: signInUser,
};

let authType = signInType;


function displayAuth() {
    authHeader.textContent = authType.header;
    authButton.textContent = authType.button;
    changeType.textContent = authType.prompt;
    errorDisplay.textContent = '';
}


displayAuth();


changeType.addEventListener('click', (e) => {

    e.preventDefault();


    authType = authType === signInType ? signUpType : signInType;


    displayAuth();
});

authForm.addEventListener('submit', async (e) => {

    e.preventDefault();


    errorDisplay.textContent = '';
    const buttonText = authButton.textContent;
    authButton.disabled = true;
    authButton.textContent = 'Authenticating...';


    const formData = new FormData(authForm);

    const { error } = await authType.action(formData.get('email'), formData.get('password'));

    if (error) {

        errorDisplay.textContent = error.message;
        authButton.disabled = false;
        authButton.textContent = buttonText;
    } else {

        location.replace(redirectUrl);
    }
});

const tosCheckbox = document.getElementById('tos-checkbox');
tosCheckbox.addEventListener('change', toggleTosCheckbox);
function toggleTosCheckbox() {
    if (tosCheckbox.checked) {
        authButton.disabled = false;
    } else {
        authButton.disabled = true;
    }
}
const acceptButton = document.getElementById('accept-button');
acceptButton.addEventListener('click', toggleAcceptButton);
function toggleAcceptButton() {
    tosCheckbox.checked = true;
    toggleTosCheckbox();
}