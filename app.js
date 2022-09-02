import { checkAuth, signOutUser, } from './fetch-utils.js';


const signOutLink = document.getElementById('sign-out-link');

checkAuth();

signOutLink.addEventListener('click', signOutUser);

