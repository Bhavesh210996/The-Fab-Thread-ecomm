import { createContext, useContext, useState } from "react";

const SearchProductContextApi = createContext();

function SearchProductContextProvider({children}){
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchProductContextApi.Provider value={{searchQuery, setSearchQuery}}>
            {children}
        </SearchProductContextApi.Provider>
    )
}

function useSearchQuery(){
    const context = useContext(SearchProductContextApi)
    if(context === undefined) throw new Error("Context was used outside the provider")
    return context;
}

export {SearchProductContextProvider, useSearchQuery};