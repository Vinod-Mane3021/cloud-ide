import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { BuiltInProviderType } from "next-auth/providers";

type Props = {
  onSignIn: (provider: BuiltInProviderType) => void;
  isPending: boolean;
};

export const OauthProviderContainer = ({ onSignIn, isPending }: Props) => {
  const signInWithGoogle = async () => {
    onSignIn("google");
  };

  const signInWithGithub = async () => {
    onSignIn("github");
  };

  return (
    <div className="w-full flex gap-2 mt-3">
      <Button
        disabled={isPending}
        variant="outline"
        className="w-1/2"
        onClick={signInWithGoogle}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        disabled={isPending}
        variant="outline"
        className="w-1/2"
        onClick={signInWithGithub}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
};
