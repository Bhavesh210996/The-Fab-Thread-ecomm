import supabase from "./supabase";

export async function getProductsList(filterValue = []){
    let query = supabase
    .from("products")
    .select("*");
    
    //Filter
    filterValue.forEach((filter) => {
        query = query.in(filter.field, filter.value)
    })

    const {data, error} = await query;

        if(error){
            console.log(error.message);
            throw new Error(error.message);
        }
        return data;
}

export async function setItemRating(newRating, id){
    //fetching the data for product based on product id
    const {data, error: fetchError} = await supabase
        .from("products")
        .select("userRatings")
        .eq("id", id)
        .single()

    if(fetchError){
        throw new Error(fetchError.message)
    }
    
    const updateRatings = Array.isArray(data.userRatings) ? data.userRatings : [];

    //updating same user object if user already given the rating, if not then pushing new object in array
    if(updateRatings.length > 0){
        const userIndex = updateRatings.findIndex((rate) => rate.userId === newRating.userId);
        if(userIndex !== -1){
            updateRatings[userIndex] = {...updateRatings[userIndex], ...newRating}
        }else{
            updateRatings.push(newRating);
        }
        console.log(updateRatings)
    }else{
        updateRatings.push(newRating);
    }

    //pushing new object or and updated object in the userRating array
    const { error } = await supabase
        .from("products")
        .update({
            userRatings: updateRatings
        })
        .eq("id", id)
        .select()
        .single();

    if(error){
        throw new Error(error.message)
    }
}