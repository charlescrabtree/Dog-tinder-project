import { checkAuth, getUserById, savePawfile, uploadImage, signOutUser } from '../fetch-utils.js';

const pawfileFormEl = document.getElementById('pawfile-form');
const nameEl = document.getElementById('pawfile-name');
const bioEl = document.getElementById('pawfile-bio');
const buttonEl = document.getElementById('add-pawfile');
const avatarEl = document.getElementById('avatar');
const avatarPreviewEl = document.getElementById('pawfile-image');
const signOutLink = document.getElementById('sign-out-link');
const user = checkAuth();

signOutLink.addEventListener('click', signOutUser);

pawfileFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(pawfileFormEl);
    const name = data.get('pawfile-name');
    const bio = data.get('pawfile-bio');
    const imageFile = data.get('pawfile-image');

    const file = avatarPreviewEl.files[0];
    avatarEl.src = URL.createObjectURL(file);

    const pawfileObject = {
        user_id: user.id,
        name: name,
        bio: bio,
    
    };

    if (imageFile.size) {
        const imageName = `${user.id}/${imageFile.name}`;

        const url = await uploadImage (
            'images',
            imageFile,
            imageName,
        );
    
        pawfileObject.image_url = url;
    }
    await savePawfile(pawfileObject);

    displayUser();

    pawfileFormEl.reset();
});

async function displayUser() {
    const response = await getUserById(user.id);
    
    if (!response) {
        await savePawfile(user.id);
        displayUser();
    } else {
        nameEl.value = response.name;
        bioEl.value = response.bio;
        avatarEl.src = response.image_url;
        buttonEl.textContent = 'update';
    }
}

displayUser();