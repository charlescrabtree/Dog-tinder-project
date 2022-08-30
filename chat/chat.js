import { checkAuth, addMessage, getAllMessages } from '../fetch-utils.js';
import { renderMessage } from '../render-function.js';

const chatFormEl = document.getElementById('chat-form');
const chatContainerEl = document.getElementById('chat-container');


checkAuth();




async function displayComments() {
    const messages = await getAllMessages();
    chatContainerEl.innerHTML = '';
    for (let message of messages) {
        const renderChat = renderMessage(message);
        chatContainerEl.append(renderChat);
    }
}




chatFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(chatFormEl);
    const response = await addMessage({ message: formData.get('text') });
    console.log(formData, response);
    // const message = response.data;
    // addMessage(message);

    displayComments();


    chatFormEl.reset();
});






