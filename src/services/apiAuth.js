import {supabase} from "./supabase";

export async function userLogin({email, password}){
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error){
        console.log(error.message)
        throw new Error(error.message)
    }

    return data;
}

export async function getCurrentUser(){
    const {data: session} = await supabase.auth.getSession();

    if(!session.session) return null;

    const {data, error} = await supabase.auth.getUser();

    if(error){
        console.log(error.message);
    }

    return data?.user;
}

export async function userLogout(){
    const {data: session} = await supabase.auth.getSession();

    if(!session.session) return null;

    const {error} = await supabase.auth.signOut();

    if(error){
        console.log(error.message)
    }
}

export async function createNewUser({email, password, optionData}){
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName: optionData.fullName,
                phone: optionData.phone
            }
        }
    })

    if(error){
        throw new Error("User sign up is failed, please try again")
    }

    return data;
}

export const updatePassword = async (email, password) => {
    const {data, error} = await supabase.auth.resetPasswordForEmail({email, password})

    if(error){
        throw new Error(error.message)
    }

    return data;
}