// import { renderAllUsers } from '../render-function.js';
// import { getUserById, getAllUsers } from '../fetch-utils.js';

// const usersEl = document.getElementById('all-users');



// async function displayAllUsers() {
//     const users = await getAllUsers();


//     for (let user of users) {
//         const userDiv = renderAllUsers(user);
//         usersEl.append(userDiv);
//     }

// }




// displayAllUsers();

const pawfileFormEl = document.getElementById('pawfile-form');
const usersEl = document.getElementById('all-users');


pawfileFormEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(pawfileFormEl);

  const nameEl = data.get('pawfile-name');
  const bioEl = data.get('pawfile-bio');
  const imgEl = data.get('pawfile-image');

  await savePawfile({
      user_id: user.id,
      user_name: name,
      bio: bio,
      image_url: img
  });


