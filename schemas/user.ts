import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "@/constants";
import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(1, { message: "Email or username required" }),
  password: z.string(),
});


export const signUpSchema = z.object({
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH, { message: `Username must be at least ${MIN_USERNAME_LENGTH} characters long` })
    .max(MAX_USERNAME_LENGTH, { message: `Username must be at most ${MAX_USERNAME_LENGTH} characters` }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(MIN_EMAIL_LENGTH, { message: `Email must be at least ${MIN_EMAIL_LENGTH} characters long` })
    .max(MAX_EMAIL_LENGTH, { message: `Email must be at most ${MAX_EMAIL_LENGTH} characters` }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, { message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` })
    .max(MAX_PASSWORD_LENGTH, { message: `Password must be at least ${MAX_PASSWORD_LENGTH} characters` }),
});

export const signInWithOauthProviderSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  profileImage: z.string().optional().nullable(),
  providerId: z.string(),
  provider: z.enum(["github", "google"]),
});

export type SignInType = z.infer<typeof signInSchema>;
export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInWithOauthProviderType = z.infer<typeof signInWithOauthProviderSchema>;
