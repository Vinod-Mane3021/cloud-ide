"use client";

import { FaCaretRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader } from "@/components/loader";
import { PasswordInput } from "@/components/password-input";
import { useSignInWithProvider } from "@/features/user/api/use-signin-with-provider";
import { AlertMessage } from "@/components/alert-message";
import { BuiltInProviderType } from "next-auth/providers";
import { OauthProviderContainer } from "@/components/auth/oauth-provider-container";
import { useSignUp } from "@/features/user/api/use-signup";
import { signUpSchema } from "@/schemas/user";
import { useRouter } from "next/navigation";

const formSchema = signUpSchema

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const signInWithProviderMutation = useSignInWithProvider()
  const signUpMutation = useSignUp()

  const message = signUpMutation.data?.message || signUpMutation.data?.errors?.toString() || signInWithProviderMutation.data?.message
  const isPending = signInWithProviderMutation.isPending || signUpMutation.isPending

  const router = useRouter()

  const signInWithOauthProvider = async (provider: BuiltInProviderType) => {
    signInWithProviderMutation.mutate({ provider }, {
      onSuccess: (json) => {
        console.log({
          signInWithOauthProvider: json
        })
      }
    })
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const signin = () => {
      signInWithProviderMutation.mutate({ 
        provider: "credentials", 
        values: { 
          identifier: values.email, 
          password: values.password 
        } 
      },
      {
        onSuccess: (json) => {
          router.push("/dashboard")
        }
      })
    }

    signUpMutation.mutate(values, {
      onSuccess: () => signin()
    })
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center px-2 md:px-0 flex-col">
      <div className="w-[400px] mb-2">
        {message && <AlertMessage message={message} type="warning" />}
      </div>
      <div className="bg-gray-100 shadow-lg rounded-xl border">
        <div className="bg-white w-[400px] shadow-sm px-5 py-5 rounded-xl flex flex-col gap-2  border">
          <p className="font-semibold text-xl text-center tracking-tight">
            Create your account
          </p>
          <p className="text-sm font-medium text-center text-muted-foreground">
            Welcome! Please fill in the details to get started.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 pt-2"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john123@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="mt-5">
                {isPending && <Loader className="text-white"/>}
                {!isPending && <><p>Continue</p> <FaCaretRight className="size-4 ml-2" /></>}
              </Button>
            </form>

            {/* or */}
            <div className="flex w-full items-center justify-center gap-2 mt-3">
              <div className="w-[45%] border-t border-gray-300" />
              <p className="text-muted-foreground text-sm font-light">or</p>
              <div className="w-[45%] border-t border-gray-300" />
            </div>

            {/* providers */}
            <OauthProviderContainer
              isPending={isPending}
              onSignIn={signInWithOauthProvider}
            />
            
          </Form>
        </div>
        <div>
          <p className="text-sm font-medium py-4 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="hover:underline text-primary cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;



