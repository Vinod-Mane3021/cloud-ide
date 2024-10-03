import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { customZValidator } from "@/db/customZValidator";

const createUserSchema = z.object({
    username: z
        .string()
        .min(4, { message: "Username must be at least 4 characters long" })
        .max(255, { message: "Username must be at most 255 characters" }),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(4, { message: "Email must be at least 4 characters long" })
        .max(255, { message: "Email must be at most 255 characters" }),
    password: z.string().optional().nullable(),
    profileImage: z.string().url().optional().nullable(), // Added URL validation for profileImage
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
    .post(
        "/create",
        customZValidator("json", createUserSchema),
        async (c) => {
              const { username, email, password, profileImage, provider, providerId } =
                c.req.valid("json");

                console.log({username, email, password, profileImage, provider, providerId})

            return c.json({
                name: "vinod",
            });
        }
    );

export default app;



