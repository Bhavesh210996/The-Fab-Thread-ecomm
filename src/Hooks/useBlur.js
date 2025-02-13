import { useEffect } from "react";

const useBlur = (ref) => {
    useEffect(() => {
        const handleBlur = (index) =>{
            const value = ref.current[index].value;
            const sibling = ref.current[index].nextElementSibling;
            if(!value){
                if(sibling) sibling.classList.remove("hide");
            }
        }
    
        ref.current.forEach((inputEl, index) => {
            if(inputEl){
                inputEl.addEventListener("blur", () => handleBlur(index))
            }
        })
    
        return () => {
            ref.current.forEach((inputEl, index) => {
                if(inputEl){
                    inputEl.removeEventListener("blur", () => handleBlur(index))
                }
            })
        }
    })
    return ref;
}

export default useBlur;