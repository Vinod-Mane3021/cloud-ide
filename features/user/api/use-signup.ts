import { SignUpType } from "@/schemas/user";
import { ApiResponseType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

type RequestType = SignUpType;
type ResponseType = ApiResponseType;

export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const endpoint = "http://localhost:3000/api/auth/sign-up";
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(json),
      });
      console.log({ useSignUp_response_status: response.status });
      const data: ResponseType = await response.json();

      if(response.ok) {
        return data;
      }
      throw new Error(data.message)
    },
  });
  return mutation;
};
