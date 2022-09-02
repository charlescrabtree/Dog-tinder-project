import { checkAuth, } from './fetch-utils.js';
// import { renderAllUsers } from './render-function.js';




checkAuth();



signOutLink.addEventListener('click', signOutUser);


// async function loadPawfile() {
//     const pawfile = await getUserById(user.id);
//     if (pawfile && pawfile.image_url) {
//         const pawfileImg = document.querySelector('.pawfile-image');
//         console.log(pawfileImg);
//         pawfileImg.src = pawfile.image_url;
//     }
// }




