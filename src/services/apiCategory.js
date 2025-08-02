import {graphQlClient, supabase} from "./supabase";

export async function getCategories(){

const query = `
  query {
    categoryCollection {
      edges {
        node {
          id
          page
          name
          image
          discount
          gender
        }
      }
    }
  }
`;
let data;
try {
    data  = await graphQlClient.request(query);
} catch (error) {
    console.log(error.response?.errors)
}
return data?.categoryCollection?.edges?.map(edge => edge.node);

    // const { data: category, error } = await supabase
    // .from('category')
    // .select('*')

    // if(error){
    //     console.log("category", error.message)
    // }
      
}