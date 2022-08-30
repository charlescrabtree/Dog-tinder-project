export function renderAllUsers(user) {
    const userEl = document.createElement('div');
    userEl.classList.add('user-div');
    


    const imgEl = document.createElement('img');
    imgEl.classList.add('img-tag');
    imgEl.src = user.image_url;


    const nameEl = document.createElement('p');
    nameEl.classList.add('name-tag');
    nameEl.textContent = user.name;


    const bioEl = document.createElement('p');
    bioEl.classList.add('bio-tag');
    bioEl.textContent = user.bio;


    userEl.append(imgEl, nameEl, bioEl);


    return userEl;
}

export function renderMessage(comment) {
    
    const commentP = document.createElement('p');
    commentP.textContent = comment.message;
        
    
    return commentP;
}



