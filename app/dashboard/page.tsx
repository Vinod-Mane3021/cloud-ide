import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();

  const signout = async () => {
    "use server";
    const signout_res = await signOut({ redirectTo: "/sign-in" });
    console.log({ signout_res });
  };

  return (
    <form
      action={signout}
      className="h-screen flex-col gap-10 w-screen flex items-center justify-center"
    >
      <p className="w-full p-20">session = {JSON.stringify(session)}</p>
      <Button type="submit">sign out </Button>
      <Button>Test Button</Button>
    </form>
  );
};

export default DashboardPage;
