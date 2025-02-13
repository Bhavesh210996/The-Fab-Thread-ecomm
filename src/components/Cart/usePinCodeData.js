import { useMutation } from "@tanstack/react-query";
import { getPinCodeData } from "../../services/apiCart";

export function usePinCodeData(){
    const {mutate: pincodeDataFn, isPending: isPinCodeLoading, data} = useMutation({
        mutationFn: getPinCodeData
    })

    return {pincodeDataFn, isPinCodeLoading, data}
}