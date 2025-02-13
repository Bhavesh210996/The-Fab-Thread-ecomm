import { createContext, useContext, useState } from "react";

const SelectAddressContextApi = createContext();

function SelectAddressContextProvider({children}){
    const [selectedAddress, setSelectAddress] = useState(null);

    return (
        <SelectAddressContextApi.Provider value={{selectedAddress, setSelectAddress}}>
            {children}
        </SelectAddressContextApi.Provider>
    )
}

function useSelectedAddress(){
    const context = useContext(SelectAddressContextApi)
    if(context === undefined) throw new Error("Context was used outside the provider")
    
    return context
}

export {SelectAddressContextProvider, useSelectedAddress};