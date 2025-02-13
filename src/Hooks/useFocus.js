import { useEffect } from "react";

function useFocus(ref){
    useEffect(() => {
        function handleFocus(index){
            const sibling = ref.current[index].nextElementSibling
            if(sibling){
                sibling.classList.add("hide")
            }
        }

        ref.current.forEach((inputEl, index) => {
            if(inputEl){
                inputEl.addEventListener("focus", () => handleFocus(index))
            }
        })

        return () => {
            ref.current.forEach((inputEl, index) => {
                if(inputEl){
                    inputEl.removeEventListener("focus", () => handleFocus(index))
                }
            })
        }
    })

    return ref;
}

export default useFocus;