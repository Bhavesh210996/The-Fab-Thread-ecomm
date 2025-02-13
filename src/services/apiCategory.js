import supabase from "./supabase";

export async function getCategories(){
    
    const { data: category, error } = await supabase
    .from('category')
    .select('*')

    if(error){
        console.log("category", error.message)
    }
    return category;       
}