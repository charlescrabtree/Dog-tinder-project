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
    const response = await client
        .from('pawfile')
        .select('*');

    if (response.error) {
        throw new Error(response.error.message);
    }
    return response.data;

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

export async function addMessage(message) {
    return await client
        .from('pawfile_chat')
        .insert(message)
        .single();
}

export async function getAllMessages() {
    const response = await client
        .from('pawfile_chat')
        .select('*')
        .order('created_at');

    return response.data;
}

export async function getMessageById(user_id) {
    const response = await client
        .from('pawfile_chat')
        .select('*')
        .match({ user_id })
        .single();
    
    if (response.error) {
        throw new Error(response.error.message);
    }
    return response.data;
}

export async function uploadImage(imageFile, imageName) {
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

export async function getSingleUser(user_id) {
    const response = await client
        .from('pawfile')
        .select()
        .match({ user_id })
        .single();

    return response.data;
}

export async function onMessage(handleNewMessage) {
    await client 
        .from('pawfile_chat')
        .on('INSERT', handleNewMessage)
        .subscribe();
}

export async function deleteMessage(id) {
    const response = await client
        .from('pawfile_chat')
        .delete()
        .match({ id });
    
    return response.data;
}

export async function getAllDetailComments(target_id) {
    const response = await client
        .from('comments')
        .select('*')
        .match({ target_id });

    return response.data;        
}

export async function createDetailComment(comment, target_id) {
    const response = await client
        .from('comments')
        .insert({
            message: comment, 
            target_id: target_id
        });
        
    return response.data;
}

export async function onComment(handleNewComment) {
    await client 
        .from('comments')
        .on('INSERT', handleNewComment)
        .subscribe();
}
