import { useMutation } from "@tanstack/react-query"
import { fetchSuggestions } from "../../services/apiMenProducts"

export function useFetchSuggestions(){
    const {mutate: fetchSuggestionsFn, isPending: suggestionsLoading} = useMutation({
        mutationFn: (query) => fetchSuggestions(query),
        onSuccess: (data) => {
            console.log("suggestions", data)
        }
    })

    return {fetchSuggestionsFn, suggestionsLoading}
}