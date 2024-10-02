"use client"

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
  const { data: session_data } = useSession()

  const signout = async () => {
    const signout_res = await signOut({ redirectTo: "/sign-in" });
    console.log({ signout_res });
  };

  return (
    <form
      action={signout}
      className=" flex-col gap-10 flex items-center justify-center w-screen"
    >
      <br/>
      <br/>
      <p className="w-[800px]">{JSON.stringify(session_data)}</p>
      <Button type="submit">sign out </Button>
      <Button>Test Button</Button>
    </form>
  );
};

export default DashboardPage;
