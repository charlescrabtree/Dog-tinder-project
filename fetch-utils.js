const SUPABASE_URL = 'https://mtegvpmustvqjcrpqjft.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZWd2cG11c3R2cWpjcnBxamZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2MzgyMTYsImV4cCI6MTk3NTIxNDIxNn0.1qATbqaxyJY3HmYMZsX0LcLV6_XXcgd_qnE96O4JeR8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
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


// export async function getUserById(user_id) {
//     const resp = await client.from('pawfile').select('*').match({ user_id });
    
//     if (resp.error) {
//         throw new Error(resp.error.message);
//     }

//     return resp.data;


// }

export async function savePawfile(user_id) {
    return await client
        .from('pawfile')
        .upsert(user_id);
}
/* Data functions */

