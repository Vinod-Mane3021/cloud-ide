import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(1, { message: "Email or username required" }),
  password: z.string(),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(10, { message: "Username must be at most 10 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(4, { message: "Email must be at least 4 characters long" })
    .max(25, { message: "Email must be at most 25 characters" }),
  password: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
});

export type signInType = z.infer<typeof signInSchema> 
export type signUpType = z.infer<typeof signUpSchema> 