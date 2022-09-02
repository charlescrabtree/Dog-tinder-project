import { renderSingleUser, renderMessage } from '../../render-function.js';
import { getSingleUser, checkAuth, getUserById, createDetailComment, getAllDetailComments, onComment } from '../../fetch-utils.js';

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
    const params = new URLSearchParams(window.location.search);
    const id = params.get('user_id');

    await createDetailComment(formData.get('text'), id);

    chatFormEl.reset();
});


async function displayDetailComments() {
    chatContainerEl.textContent = '';

    const params = new URLSearchParams(window.location.search);
    const id = params.get('user_id');
    const comments = await getAllDetailComments(id);

    for (let comment of comments) {
        const commenterUser = await getUserById(comment.comment_by_id);
        const renderChat = renderMessage(comment.message, commenterUser, currentUser);

        chatContainerEl.append(renderChat);

        renderChat.scrollIntoView({
            behavior: 'smooth'
        });
    }
}


async function displayDetailComment(comment) {
    const commenterUser = await getUserById(comment.comment_by_id);
    const renderChat = renderMessage(comment.message, commenterUser, currentUser);

    chatContainerEl.append(renderChat);

    renderChat.scrollIntoView({
        behavior: 'smooth'
    });
}

displayDetailComments();

onComment((payload) => {
    
    displayDetailComment(payload.new);
});

