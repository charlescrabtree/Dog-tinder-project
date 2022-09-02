import { checkAuth, signOutUser, getUserById, getAllUsers, } from './fetch-utils.js.';
import { renderAllUsers } from './render-function.js.';

checkAuth();
const user = checkAuth();


const userContainerEl = document.getElementById('users-container');
const signOutLink = document.getElementById('sign-out-link');


signOutLink.addEventListener('click', signOutUser);


async function displayAllUsers() {
    const users = await getAllUsers();

    for (let user of users) {
        const userDiv = renderAllUsers(user);
        userContainerEl.append(userDiv);
    }

}



async function loadPawfile() {
    const pawfile = await getUserById(user.id);
    if (pawfile && pawfile.image_url) {
        const pawfileImg = document.querySelector('.pawfile-image');
        console.log(pawfileImg);
        pawfileImg.src = pawfile.image_url;
    }
}

displayAllUsers();
loadPawfile();
