import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useSEO({description, title}) {
    const location = useLocation();
    useEffect(() => {
        if(title){
            document.title = title
        }else{
            document.title = "FabThread - Online Shopping for Men, Women, Kids Fashion & Lifestyle";
        };
        if(description){
            const meta = document.querySelector('meta[name="description"]');
            if(meta){
                meta.setAttribute("content", description);
            }
        }
        const link = document.querySelector('link[rel="canonical"]');
        if(link){
            link.setAttribute("href", `https://fabthread.vercel.app/${location.pathname}`);
        }
    }, [description, title, location.pathname])
}

export default useSEO
