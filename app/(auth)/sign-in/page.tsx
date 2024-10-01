"use client";

import { FaCaretRight, FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(1, { message: "email requires" }),
  password: z.string().min(1, { message: "password required" }),
});

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <div className="w-screen h-screen flex items-center justify-center px-2 md:px-0 flex-col">
      <div className="bg-gray-100 shadow-lg rounded-xl border">
        <div className="bg-white w-[400px] shadow-sm px-5 py-5 rounded-xl flex flex-col gap-2  border">
          <p className="font-semibold text-xl text-center tracking-tight">
            Sign in to SaaS App
          </p>
          <p className="text-sm font-medium text-center text-muted-foreground">
            Welcome back! Please sign in to continue
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 pt-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
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
                      <Input placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                Continue <FaCaretRight className="size-4 ml-2" />
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
              <Button variant="outline" className="w-1/2 ">
                <FcGoogle className="size-5" />
              </Button>
              <Button variant="outline" className="w-1/2">
                <FaGithub className="size-5" />
              </Button>
            </div>
          </Form>
        </div>
        <div>
          <p className="text-sm font-medium py-4 text-center text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="hover:underline text-primary cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
