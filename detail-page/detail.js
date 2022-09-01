import { renderSingleUser, renderMessage } from '../render-function.js';
import { getSingleUser, addMessage, checkAuth, getUserById } from '../fetch-utils.js';



const userDetailEl = document.getElementById('user-detail');
const chatFormEl = document.getElementById('chat-form');
const chatContainerEl = document.getElementById('chat-container');
const currentUser = checkAuth();


window.addEventListener('load', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('user_id');

    const user = await getSingleUser(id);
   

    const petDetailEl = renderSingleUser(user);
    userDetailEl.append(petDetailEl);
});




chatFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(chatFormEl);
    await addMessage({ message: formData.get('text') });

    chatFormEl.reset();
});


async function displayMessage(message) {
    const userId = await getUserById(message.pawfile_id);
    const renderChat = renderMessage(message, userId, currentUser);
    chatContainerEl.append(renderChat);

    renderChat.scrollIntoView({
        behavior: 'smooth'
    });
}

displayMessage();
