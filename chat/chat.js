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

  
    // displayComments();
    chatFormEl.reset();
});


displayComments();



const pawFileChat = client 
    .from('*')
    .on('*', payload => {
        console.log('Change received!', payload);
    })
    .subscribe();
console.log('ok subcribbbbd');
