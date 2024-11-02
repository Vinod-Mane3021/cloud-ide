"use client";

import { FaCaretRight, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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
import { useSession } from "next-auth/react";
import { signInWithProvider } from "@/features/user/services/auth";
import { useSignInWithProvider } from "@/features/user/api/use-signin-with-provider";
import { AlertMessage } from "@/components/alert-message";

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be more that 4 characters" }),
  email: z.string().email({ message: "Valid email address required" }).min(4),
  password: z
    .string()
    .min(6, { message: "Password must be more that 6 characters" }),
});

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

  const message = signInWithProviderMutation.data?.message
  const isPending = signInWithProviderMutation.isPending

  const { data: session_data } = useSession()

  const signInWithGoogle = async () => {
    signInWithProviderMutation.mutate({
      provider: "google"
    })
  };

  const signInWithGithub = async () => {
    signInWithProviderMutation.mutate({
      provider: "github"
    })
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center px-2 md:px-0 flex-col">
      <div className="w-[400px] mb-2">
        {message && <AlertMessage message={message} type="warning" />}
      </div>
      <div className="bg-gray-100 shadow-lg rounded-xl border">
        <div className="bg-white w-[400px] shadow-sm px-5 py-5 rounded-xl flex flex-col gap-2  border">
          <p className="w-[800px]">{JSON.stringify(session_data)}</p>
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
                Continue <FaCaretRight className="size-4 ml-2" />
                {/* <Loader className="text-white"/> */}
              </Button>
            </form>

            {/* or */}
            <div className="flex w-full items-center justify-center gap-2 mt-3">
              <div className="w-[45%] border-t border-gray-300" />
              <p className="text-muted-foreground text-sm font-light">or</p>
              <div className="w-[45%] border-t border-gray-300" />
            </div>

            {/* providers */}
            <div className="w-full flex gap-2 mt-3">
              <Button disabled={isPending} variant="outline" className="w-1/2" onClick={signInWithGoogle}>
                <FcGoogle className="size-5" />
              </Button>
              <Button disabled={isPending} variant="outline" className="w-1/2" onClick={signInWithGithub}>
                <FaGithub className="size-5" />
              </Button>
            </div>
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



