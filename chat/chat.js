import { checkAuth, addMessage, getAllMessages, getUserById, client } from '../fetch-utils.js';
import { renderMessage } from '../render-function.js';

const chatFormEl = document.getElementById('chat-form');
const chatContainerEl = document.getElementById('chat-container');


checkAuth();




async function displayComments() {
    const messages = await getAllMessages();
    chatContainerEl.innerHTML = '';
    for (let message of messages) {
        const userId = await getUserById(message.pawfile_id);
        const renderChat = renderMessage(message, userId);
        chatContainerEl.append(renderChat);
    }
}




chatFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(chatFormEl);
    await addMessage({ message: formData.get('text') });

    await client 
        .from('pawfile_chat')
        .on('*', async payload => {
            console.log('Change received!', payload);
        })
        .subscribe();
        
    displayComments();
    chatFormEl.reset();
});


displayComments();






