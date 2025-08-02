import {graphQlClient, supabase} from "./supabase";

export async function getCurrentUserOrders(){
    const query = `
        query {
            ordersCollection(orderBy: [{ id: AscNullsFirst }]){
                edges{
                    node{
                        id
                        userId
                        productId
                        productDetails{
                            brand
                            itemName
                            size
                            quantity
                            price
                            itemImage
                        }
                        userRating{
                            orderReview
                            date
                            orderRating
                        }
                    }
                }
            }
        }
    `;
    const data = await graphQlClient.request(query);

    return data?.ordersCollection?.edges?.map(edge => { 
        const details = JSON.parse(edge.node.productDetails);
        const rating = JSON.parse(edge.node.userRating);

        return {
            ...edge.node,
            productDetails: details,
            userRating: rating,
        };
    });
    // const {data, error} = await supabase.from("orders").select("*").order('id', { ascending: true })

    // if(error){
    //     console.log(error.message)
    // }

    // return data;
}

export async function setRating(userRating, id){
    const query = `
        mutation{
            updateordersCollection(
                data: {userRating: "${JSON.stringify(userRating)}"}
                filter: {id: {eq: "${id}"}}
            ){
                affectedCount
                records{
                    id
                    userRating
                }
            }
        }
    `
    const data = await graphQlClient.request(query);

    // const {data, error} = await supabase
    //     .from("orders")
    //     .update({userRating})
    //     .eq("id", id).select().single();

    //     if(error){
    //         throw new Error(error.message)
    //     }

        return data.updateOrders.records;
}

