import { checkAuth, signOutUser, getAllUsers, } from './fetch-utils.js';
import { renderAllUsers, } from './render-function.js';

const signOutLink = document.getElementById('sign-out-link');
const userContainerEl = document.getElementById('users-container');

checkAuth();

signOutLink.addEventListener('click', signOutUser);

async function displayAllUsers() {
    const users = await getAllUsers();

    for (let user of users) {
        const userDiv = renderAllUsers(user);
        
        userContainerEl.append(userDiv);
    }
}





displayAllUsers();