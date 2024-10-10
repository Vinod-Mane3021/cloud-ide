import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { customZValidator } from "@/db/customZValidator";
import { getUserByEmailAndPwdService } from "@/db/services/user";
import { hashPassword } from "@/lib/utils";
import { db } from "@/db/prisma-client";
import { HttpStatusCode } from "@/constants/http-status-code";
import { logger } from "@/logger";

const createUserSchema = z.object({
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
  provider: z.string().optional().nullable(),
  providerId: z.string().optional().nullable(),
});

const getUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// user routes
const app = new Hono()

  .get("/", zValidator("json", getUserSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const hashedPwd = await hashPassword(password);
    const user = await getUserByEmailAndPwdService(email, hashedPwd);

    if (!user) {
      throw new Error("User not found.");
    }
    return c.json({
      user,
    });
  })

  // This route is responsible for creating user
  .post("/create", zValidator("json", createUserSchema), async (c) => {
    try {
      const { username, email, password, profileImage, provider, providerId } = c.req.valid("json");
      const hashedPwd = await hashPassword(password);

      // check for existing user
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return c.json(
          {
            success: false,
            message: "An account with this email already exists. Please sign-in or use a different email.",
          },
          HttpStatusCode.BAD_REQUEST
        );
      }

      // Create the new user
      const user = await db.user.create({
        data: {
          username,
          email,
          password: hashedPwd,
          profileImage,
          provider,
          providerId,
        },
      });
      if (!user) {
        return c.json(
          {
            success: false,
            message: "We encountered a problem while creating your account. Please try again later.",
          },
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
      return c.json(
        {
          success: true,
          message: "Account created successfully! You can now sign-in.",
        },
        HttpStatusCode.CREATED
      );
    } catch (error) {
      console.error("Error while creating user:", error);
      return c.json(
        {
          success: false,
          message: "An unexpected error occurred while processing your request. Please try again later."
        },
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  });

export default app;
