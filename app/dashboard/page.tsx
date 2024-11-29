// "use client"

import { Terminal } from "@/features/terminal/components/terminal";
import { useSession } from "next-auth/react";
import React from "react";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";


const DashboardPage = async () => {
  // const { data } = useSession()
  const data = await auth()

  // console.log({data})

  // const vefiryT = () => {
  //   const token = data?.access_token as string
  //   const key = process.env.AUTH_SECRET as string

  //   const is_verify = jwt.verify(token, key)

  //   console.log({
  //     is_verify
  //   })

  // }

  return <>

  {/* <p>access_token - {JSON.stringify(data?.access_token)}</p>
  <br/>
  <br/>
  <p>refresh_token - {JSON.stringify(data?.refresh_token)}</p>
  <br/>
  <br/>
  <p>{JSON.stringify(data)}</p>
  <br/>
  <br/> */}

<p>access_token - {JSON.stringify(data?.access_token)}</p>
<br/>
  <br/>
  <br/>
  <br/>
<p>bearer_token - {JSON.stringify(data?.bearer_token)}</p>

  {/* <Button onClick={vefiryT}>verify</Button> */}
  {/* <Terminal /> */}
  </>;
};
export default DashboardPage;



