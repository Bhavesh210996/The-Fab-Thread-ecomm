import {supabase} from "./supabase";

export async function createNewCartEntry(entry, id){
    let query = supabase.from("cartEntries");

    if(!id){
        query = query.insert([entry]);
    }
    if(id){
        query = query.update({...entry}).eq("id", id);
    }
    const {data, error} = await query.select().single();

    if(error){
        console.log(error.message)
        throw new Error(error.message)
    }
    return data;
}

export async function getCartEntries(){
    const {data, error} = await supabase.from("cartEntries").select("*, products(*)").order('id', { ascending: true });

    if(error){
        console.log(error.message)
        throw new Error(error.message)
    }
    return data;
}

export async function deleteCartEntry(id, entries){
    let query = supabase.from("cartEntries")
    
    if(id){
        query = query.delete().eq("id", id);
    }        
    if(entries){
        query = query.delete().eq(entries.field, entries.value);
    }
    const {data, error} = await query.select()

    if(error){
        console.log(error.message)
    }
    return data;
}

export async function getPinCodeData(value){
    try{
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`)
        const data = await res.json();

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        
        return data

    }catch(error){
        console.log("pincode", error.message)
    }
}
export async function createOrder(orderData){

    const {data, error} = await supabase.from("orders").insert(orderData).select("*");

    if(error){
        console.log(error.message)
        throw new Error(error.message)
    }

    return data;
}