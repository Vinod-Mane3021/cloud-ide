import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    access_token: string | unknown;
    refresh_token: string | unknown;
    access_token_expires_at: string | unknown;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string | unknown;
    refresh_token: string | unknown;
    access_token_expires_at: string | unknown;
  }
}

