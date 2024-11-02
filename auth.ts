import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { createUser } from "./features/user/api/sign-up";
import { signInUser } from "./features/user/api/sign-in";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { CredentialsSignin,  } from "next-auth";


class InvalidLoginError extends CredentialsSignin {
  code: string = "";

  constructor(message: string) {
    super(message)
    this.code = message
  }

}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      name: "google",
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      // authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    Github({
      name: "github",
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (
          !credentials ||
          !credentials.identifier ||
          typeof credentials.identifier !== "string" ||
          !credentials.password ||
          typeof credentials.password !== "string"
        ) {
          
          throw new InvalidLoginError("invali inputs");
        }

        const data = await signInUser({
          identifier: credentials.identifier,
          password: credentials.password,
        });

        if(!data.success) {
          console.log({"data.message": data.message})
          throw new InvalidLoginError(data.message);
        }

        console.log({data})

        if (!data) {
          throw new Error("Invalid credentials. Please try again.");
          // return null;
        }

        const { data: user } = data

        return {
          id: user?.id,
          email: user?.email,
          name: user?.username,
          image: user?.profileImage,
        };

      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, session, profile, trigger }) {
      // console.log({trigger_provider_id: account?.providerAccountId})

      // Initial sign-in
      // create user in db
      if (user && account && user.email && user.name) {
        if (account.provider === "credentials") {
          console.log("credentials provider");
        } else {
          console.log("google or github provider");
        }

        // if(account.provider || account.providerAccountId) {
        //   console.log("provider__0", account.provider)
        // } else {
        //   console.log("credentials__0")
        // }

        // const response = await createUser({
        //   username: user.name,
        //   email: user.email,
        //   provider: account.provider,
        //   providerId: account.providerAccountId,
        //   profileImage: user.image,
        // })
        // console.log({response_auth_js: response})
        // if(!response.success) {
        //   return null;
        // }
        token.access_token = account.access_token;
        // token.refresh_token = account.refresh_token;
        // token.access_token_expires_at = account.expires_at ? account.expires_at * 1000 : undefined; // expires_at is in seconds
      }
      return token;
    },
    async session({ session, token }) {
      // Add access_token and refresh_token to session

      // console.log({my_session: session})
      // console.log({my_token: token})

      session.access_token = token.access_token;
      // session.refresh_token = token.refresh_token;
      // session.access_token_expires_at = token.access_token_expires_at;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  
});
