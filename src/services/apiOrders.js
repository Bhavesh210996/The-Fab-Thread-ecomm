import supabase from "./supabase";

export async function getCurrentUserOrders(){
    const {data, error} = await supabase.from("orders").select("*").order('id', { ascending: true })

    if(error){
        console.log(error.message)
    }

    return data;
}

export async function setRating(userRating, id){
    const {data, error} = await supabase
        .from("orders")
        .update({userRating})
        .eq("id", id).select().single();

        if(error){
            throw new Error(error.message)
        }

        return data;
}