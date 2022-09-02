export function renderAllUsers(user) {
    const a = document.createElement('a');
    a.href = `./detail-page/?user_id=${user.user_id}`;
    a.classList.add('text-decoration');

    const userEl = document.createElement('div');
    userEl.classList.add('user-div');
    


    const nameEl = document.createElement('p');
    nameEl.classList.add('name-tag');
    nameEl.textContent = user.name;

    const imgEl = document.createElement('img');
    imgEl.classList.add('img-tag');
    imgEl.src = user.image_url;

    
    userEl.append(nameEl, imgEl);

    a.append(userEl);

    return a;
}

export function renderMessage(comment, user, currentUser) {
    const dogChat = document.createElement('div');
    dogChat.classList.add('div-container');

    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');

    if (user.user_id === currentUser.id) {
        dogChat.classList.add('your-message');
    }

    const avatarEl = document.createElement('img');
    avatarEl.classList.add('avatar-class');
    avatarEl.src = user.image_url;

    const dogNameEl = document.createElement('p');
    dogNameEl.classList.add('username');
    dogNameEl.textContent = `${user.name}`;

    const commentP = document.createElement('p');
    commentP.classList.add('commentP');
    if (comment) {
        commentP.innerHTML = comment.replace(/(http|https|ftp):\/\/(\S*)/g, match => `<a target = "_blank" href = "${match}">${match}</a> `);
    }
    userContainer.append(avatarEl, dogNameEl);

    dogChat.append(userContainer, commentP);

    return dogChat;
}


export function renderSingleUser(user) {
    const userEl = document.createElement('div');
    userEl.classList.add('user-div');
    
    const nameContainer = document.createElement('div');
    nameContainer.classList.add('name-container');

    const nameEl = document.createElement('p');
    nameEl.classList.add('name-tag');
    nameEl.textContent = user.name;

    const imgEl = document.createElement('img');
    imgEl.classList.add('img-tag');
    imgEl.src = user.image_url;

    const bioEl = document.createElement('p');
    bioEl.classList.add('bio-tag');
    bioEl.textContent = user.bio;
    bioEl.title = user.bio;

    nameContainer.append(imgEl, nameEl);
    
    userEl.append(nameContainer, bioEl);

    return userEl;
}


