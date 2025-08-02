import {supabase} from "./supabase";

export async function addNewAddress(newAddress){
    const {data, error} = await supabase
    .from("addreses")
    .insert(newAddress)
    .select()

    if(error){
        console.log(error.message)
    }

    return data;
}

export async function getAddreses(currentUseradd){
    const {data, error} = await supabase
        .from("addreses")
        .select("*")
        .eq(currentUseradd.field, currentUseradd.value)
        .order('id', { ascending: true });

    if(error){
        console.log(error.message)
    }

    return data;
}

export async function updateAddress(editData, id){
    const {data, error} = await supabase
        .from("addreses")
        .update(editData)
        .eq("id", id)
        .select()
        .single()

        if(error){
            console.log(error.message)
        }

        return data;
}

export async function removeAddress(id){
    const {error} = await supabase.from("addreses").delete().eq("id", id);

    if(error){
        console.log(error.message);
        throw new Error("Something went wrong")
    }
}