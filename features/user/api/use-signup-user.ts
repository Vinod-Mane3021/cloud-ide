import { useMutation } from "@tanstack/react-query"



export const useSignUpUser = () => {
    const mutation = useMutation({
        mutationFn: async () => {

        }
    })
    return mutation;
}