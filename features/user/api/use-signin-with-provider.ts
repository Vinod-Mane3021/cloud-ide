import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useMutation } from "@tanstack/react-query";
import { BuiltInProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const values = {
        ...json.values,
        redirect: false,
      };
      const properties = json.provider == "credentials" ? values : undefined;

      const res = await signIn(json.provider, properties);

      const message = json.provider == "credentials" ? res?.code : undefined;

      if(res?.error) {
        throw new Error(message)
      }
      return { message };
    },
    onSuccess: () => {
      router.push(DEFAULT_LOGIN_REDIRECT)
    }
  });

  return mutation;
};



