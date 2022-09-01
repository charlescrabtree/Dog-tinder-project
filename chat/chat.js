import { checkAuth, addMessage, getAllMessages, getUserById, signOutUser, onMessage, deleteMessage } from '../fetch-utils.js';
import { renderMessage } from '../render-function.js';

const chatFormEl = document.getElementById('chat-form');
const chatContainerEl = document.getElementById('chat-container');
const currentUser = checkAuth();
const signOutLink = document.getElementById('sign-out-link');

checkAuth();

signOutLink.addEventListener('click', signOutUser);

async function displayComments() {
    const messages = await getAllMessages();

    chatContainerEl.innerHTML = '';
    for (let message of messages) {
        displayMessage(message);
    }
}

async function displayMessage(message) {
    const userId = await getUserById(message.pawfile_id);
    const renderChat = renderMessage(message, userId, currentUser);
    const deleteButton = document.createElement('button');
    if (userId.id === userId.pawfile_id) {
        chatContainerEl.append(deleteButton);
        deleteButton.textContent = 'Delete Message';

        deleteButton.addEventListener('click', async () => {
            await deleteMessage(message.id);
            alert('You deleted your message');
        });
    }
    
    chatContainerEl.append(renderChat);

    renderChat.scrollIntoView({
        behavior: 'smooth'
    });
}

chatFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(chatFormEl);
    await addMessage({ message: formData.get('text') });

    chatFormEl.reset();
});

displayComments();

onMessage(payload => {
    
    displayMessage(payload.new);
});