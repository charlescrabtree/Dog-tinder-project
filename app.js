import { checkAuth, signOutUser, } from './fetch-utils.js';
// import { renderAllUsers } from './render-function.js';

const signOutLink = document.getElementById('sign-out-link');
const userContainerEl = document.getElementById('users-container');

checkAuth();

const signOutLink = document.getElementById('sign-out-link');


    for (let user of users) {
        const userDiv = renderAllUsers(user);
        
        userContainerEl.append(userDiv);
    }
}




