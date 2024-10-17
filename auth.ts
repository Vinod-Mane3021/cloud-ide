import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { createUser } from "./features/user/api/create-user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      // authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        username: { label: "Username" },
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch("");

        if (!response.ok) return null;

        const data = await response.json();
        return data ?? null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {

      // Initial sign-in
      // create user in db
      if(user && account && user.email && user.name) {
        const response = await createUser({
          username: user.name,
          email: user.email,
          provider: account.provider,
          providerId: account.providerAccountId,
          profileImage: user.image,
        })
        if(!response.success) { 
          return null;
        }
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

      if(session && session.user && token) {
        console.log("user auth success")
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});




