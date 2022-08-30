export function renderAllUsers(user) {
    const userEl = document.createElement('div');
    userEl.classList.add('user-div');
    

    const nameEl = document.createElement('p');
    nameEl.classList.add('name-tag');
    nameEl.textContent = user.name;

    const imgEl = document.createElement('img');
    imgEl.classList.add('img-tag');
    imgEl.src = user.image_url;




    const bioEl = document.createElement('p');
    bioEl.classList.add('bio-tag');
    bioEl.textContent = user.bio;


    userEl.append(nameEl, imgEl, bioEl);


    return userEl;
}

export function renderMessage(comment, user) {
    
    const dogChat = document.createElement('div');
    dogChat.classList.add('div-container');

    const avatarEl = document.createElement('img');
    avatarEl.classList.add('avatar-class');
    avatarEl.src = user.image_url;

    const dogNameEl = document.createElement('p');
    dogNameEl.textContent = `${user.name}:`;

    const commentP = document.createElement('p');
    commentP.textContent = comment.message;
    
    dogChat.append(avatarEl, dogNameEl, commentP);

    return dogChat;
}



