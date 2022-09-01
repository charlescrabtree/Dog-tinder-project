const SUPABASE_URL = 'https://mtegvpmustvqjcrpqjft.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZWd2cG11c3R2cWpjcnBxamZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2MzgyMTYsImV4cCI6MTk3NTIxNDIxNn0.1qATbqaxyJY3HmYMZsX0LcLV6_XXcgd_qnE96O4JeR8';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();

    if (!user) {
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';

        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

export async function getAllUsers() {
    const resp = await client.from('pawfile').select('*');

    if (resp.error) {
        throw new Error(resp.error.message);
    }
    return resp.data;

}

export async function getUserById(user_id) {
    const { data, error } = await client
        .from('pawfile')
        .select('*')
        .match({ user_id })
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function savePawfile(user_id) {
    return await client
        .from('pawfile')
        .upsert(user_id);
}

export async function addMessage(message) 
{
    return await client
        .from('pawfile_chat')
        .insert(message)
        .single();
}

export async function getAllMessages() {
    const response = await client.from('pawfile_chat').select('*').order('id');
    await client
        .from('pawfile_chat')
        .select('*');

    return response.data;
}
//REMOVED A COUPLE THING FROM LINE 80 AND IT FIXED LINT. let { data: pawfile_chat, error }
export async function getMessageById(user_id) {
    const resp = await client
        .from('pawfile_chat')
        .select('*')
        .match({ user_id })
        .single();
    
    if (resp.error) {
        throw new Error(resp.error.message);
    }
    return resp.data;
}

export async function uploadImage(bucketName, imageFile, imageName) {
    const response = await client.storage
        .from('profile-images')
        .upload(imageName, imageFile, {
            cacheControl: '3600',
            upsert: true,
        });

    if (response.error) {
        console.log(response.error);
        return null;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

export async function onMessage(handleNewMessage) {
    client 
        .from('pawfile_chat')
        .on('INSERT', handleNewMessage)
        .subscribe();
}