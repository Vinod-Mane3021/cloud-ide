import { useMutation } from "@tanstack/react-query";
import { BuiltInProviderType } from "next-auth/providers";
import { signIn, SignInResponse } from "next-auth/react";

type RequestType = {
  provider: BuiltInProviderType;
  values?: any;
};
type ResponseType = {
  message: string | undefined;
};

export const useSignInWithProvider = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const values = {
        ...json.values,
        redirect: false,
      };
      const properties = json.provider == "credentials" ? values : undefined;

      const res = await signIn(json.provider, properties);

      console.log({
        res
      })

      const message = json.provider == "credentials" ? res?.code : undefined;

      return { message };
    },
  });

  return mutation;
};
