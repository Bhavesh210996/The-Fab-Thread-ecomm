import { useMutation } from "@tanstack/react-query";
import { getPinCodeData } from "../../services/apiCart";
import toast from "react-hot-toast";

export function usePinCodeData(){
    const {mutate: pincodeDataFn, isPending: isPinCodeLoading, data} = useMutation({
        mutationFn: getPinCodeData,
        onSuccess: (data) => {
            if(data?.[0].Status === "Error"){
                toast.error("No records found. Please enter a valid pincode")
            }
        },
        onError: () => {
            toast.error("No records found. Please enter a valid pincode")
        }
    })

    return {pincodeDataFn, isPinCodeLoading, data}
}