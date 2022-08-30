// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, getUserById, getAllUsers, } from './fetch-utils.js';
import { renderAllUsers } from './render-function.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
// const pawfileFormEl = document.getElementById('pawfile-form');
// const usersEl = document.getElementById('all-users');
// // local state:

// // display functions:

// // events:
// pawfileFormEl.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const data = new FormData(pawfileFormEl);

//     const nameEl = data.get('pawfile-name');
//     const bioEl = data.get('pawfile-bio');
//     const imgEl = data.get('pawfile-image');

//     await savePawfile({
//         user_id: user.id,
//         user_name: name,
//         bio: bio,
//         image_url: img
//     });

//     displayAllUsers();
// });


// async function displayAllUsers() {
//     usersEl.innerHTML = '';
//     const users = await getAllUsers();


//     for (let user of users) {
//         const userDiv = renderAllUsers(user);
//         usersEl.append(userDiv);
//     }

// }

// displayAllUsers();
//const usersEl = document.getElementById('all-users');
const userContainerEl = document.getElementById('users-container');


async function displayAllUsers() {
    const users = await getAllUsers();


    for (let user of users) {
        const userDiv = renderAllUsers(user);
        userContainerEl.append(userDiv);
    }

}

displayAllUsers();


async function loadPawfile() {
    const pawfile = await getUserById(user.id);
    if (pawfile && pawfile.image_url) {
        const pawfileImg = document.getElementById('pawfile-image');
        pawfileImg.src = pawfile.image_url;
    }
}

loadPawfile();

// const pawfileFormEl = document.getElementById('pawfile-form');

// async function displayAllUsers() {
//     const users = await getAllUsers();
//     const pawfileRenderEl = renderAllUsers(users);
//     pawfileFormEl.append(pawfileRenderEl);
// }

// displayAllUsers();

   