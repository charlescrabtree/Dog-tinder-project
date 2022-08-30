import { checkAuth, addComment, getMessageById } from '../fetch-utils';
import { renderComment } from '../render-function.js';

const chatFormEl = document.getElementById('chat-form');
const chatContainerEl = document.getElementById('chat-container');


checkAuth();




function displayComments() {
    chatContainerEl.innerHTML = '';
    const ul = renderComment(pawfile_chat.message);
    chatContainerEl.append(ul);
}






chatFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(chatFormEl);
    const response = await addComment({ text: formData.get('text') });

    const comment = response.data;
    customElements.push(comment);

    displayComments();


    chatFormEl.reset();
});






