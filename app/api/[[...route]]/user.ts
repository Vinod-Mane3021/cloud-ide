import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { customZValidator } from "@/db/customZValidator";

const createUserSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Username is required" })
        .max(255, { message: "Username must be at most 255 characters" }),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email must be at most 255 characters" }),
    password: z.string().optional().nullable(),
    profileImage: z.string().url().optional().nullable(),
    provider: z.string().optional().nullable(),
    providerId: z.string().optional().nullable(),
});

// user routes
const app = new Hono()

    .get("/movies", (c) => {
        return c.json({
            movies: [
                {
                    title: "Movie 1",
                    year: 2021,
                },
            ],
        });
    })

    // This route is responsible for creating user
    .get(
        "/create",
        // zValidator("json", createUserSchema, (result, c) => {
        //   if (!result.success) {
        //     return c.json(
        //       {
        //         message: "invalid inputs",
        //       },
        //       400
        //     );
        //   }
        // }),
        // customZValidator("json", createUserSchema),

        async (c) => {
            //   const { username, email, password, profileImage, provider, providerId } =
            //     c.req.valid("json");

            //     console.log({username, email, password, profileImage, provider, providerId})

            return c.json({
                name: "vinod",
            });
        }
    );

export default app;



