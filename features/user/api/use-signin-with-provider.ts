import { useMutation } from "@tanstack/react-query";
import { BuiltInProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";

type RequestType = {
  provider: BuiltInProviderType;
  values?: {
    identifier: string;
    password: string;
  };
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
      
      const message = json.provider == "credentials" ? res?.code : undefined;

      return { message };
    },
  });

  return mutation;
};
