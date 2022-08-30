import { checkAuth, addMessage, getAllMessages, getUserById } from '../fetch-utils.js';
import { renderMessage } from '../render-function.js';

const chatFormEl = document.getElementById('chat-form');
const chatContainerEl = document.getElementById('chat-container');


checkAuth();




async function displayComments() {
    const messages = await getAllMessages();
    chatContainerEl.innerHTML = '';
    for (let message of messages) {
        const userId = await getUserById(message.pawfile_id);
        console.log(userId);
        const renderChat = renderMessage(message, userId);
        chatContainerEl.append(renderChat);
    }
}




chatFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(chatFormEl);
    await addMessage({ message: formData.get('text') });
    displayComments();
    chatFormEl.reset();
});


displayComments();






