import { signIn, SignInResponse } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

export const signInWithProvider = async (
  provider: BuiltInProviderType,
  values?: any
): Promise<SignInResponse | undefined> => {
  const _values = {
    ...values,
    redirect: false,
    // redirectTo: "http://localhost:3000/sign-in"
  };

  const properties = provider == "credentials" ? _values : undefined;

  const res = await signIn(provider, properties);

  return res;
};
