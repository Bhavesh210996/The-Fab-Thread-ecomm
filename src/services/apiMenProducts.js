import {supabase} from "./supabase";

export async function getProductsList(filterValue = []){
    let query = supabase
    .from("products")
    .select("*");
    
    //Filter
    filterValue.forEach((filter) => {
        query = query.in(filter.field, filter.value);
    })

    const {data, error} = await query;

        if(error){
            console.log(error.message);
            throw new Error(error.message);
        }
        return data;
}

export async function getProductsListByCategory(category = ""){
    const {data, error} = await supabase
    .from("products")
    .select("*")
    .eq("categoryName", category)

    if(error){
        console.log(error.message);
        throw new Error(error.message);
    }
    if(data && data.length > 0) return data;

    const terms = category.split("-");
    const genderTerm = terms[0];
    const itemTypeTerm = terms.slice(1).join("-");

   const { data: products, error: err } = await supabase
    .from("products")
    .select("*")
    .eq("gender", genderTerm)
    .eq("itemType", itemTypeTerm)

    if(err){
        console.log(err.message);
        throw new Error(err.message);
    }
    return products && products.length > 0 ? products : [];
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

export async function updateProductQuantity(itemsQtyArray){
    let query = supabase
                .from("products")
                .select("id, size")                 
                        
    query = query.in("id", itemsQtyArray.map(item => item.id));

    const {data: productsdata, error} = await query;

    if(error){
        throw new Error(error.message)
    }

    if(productsdata.length > 0){
        itemsQtyArray.forEach((item) => {
            const product = productsdata.find((product) => product.id === item.id);
            if(product && product.size[item.selectedSize] !== undefined){
                product.size[item.selectedSize] -= item.selectedQty;
            }
        })
    }

    const {error: updateError} = await supabase
        .from("products")
        .upsert(productsdata, {onConflict: ['id']});
    
    if(updateError){
        throw new Error(updateError.message)
    }
}

export async function fetchSuggestions(searchQuery = ""){

    const terms = searchQuery.toLowerCase().split(" ").map((t) => t.trim()).filter(t => t.length > 2);

    const orConditions = terms
    .map(
      (term) =>
        `itemName.ilike.%${term}%,itemType.ilike.%${term}%,brand.ilike.%${term}%,color.ilike.%${term}%,categoryName.ilike.%${term}%`
    )
    .join(",");

    const {data, error} = await supabase
    .from("products")
    .select("*")
    .or(orConditions)
    // .limit(5)

    if(error){
        console.log(error.message);
        throw new Error(error.message);
    }
    const suggestions = data.reduce((acc, curr) => {
        if(!acc.some(item => item.itemType === curr.itemType && item.gender === curr.gender)){
            acc.push(curr)
        }
        return acc
    }, [])
    return suggestions;
}

export async function fetchAllMAtchingProducts(selectedQuery = ""){
    const { data, error } = await supabase
    .from("products")
    .select("*")
    .textSearch("search_vector", selectedQuery, {
      type: "plain",
      config: "english",
    });

  if (error) console.error(error);
  return data;
}