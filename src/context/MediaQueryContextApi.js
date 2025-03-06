import { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

const MediaQueryContextApi = createContext();

function MediaQueryContextProvider({children}){
    const isMobile = useMediaQuery({maxWidth: 1023});
    return(
        <MediaQueryContextApi.Provider value={{isMobile}}>
            {children}
        </MediaQueryContextApi.Provider>
    )
}

function useResponsiveQuery(){
    const context = useContext(MediaQueryContextApi);
    if(context === undefined) throw new Error("Context was used outside the provider");
    return context;
}

export {MediaQueryContextProvider, useResponsiveQuery};