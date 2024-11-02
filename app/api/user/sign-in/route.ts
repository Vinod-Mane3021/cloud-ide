import { HttpStatusCode } from "@/constants/http-status";
import { db } from "@/db/prisma-client";
import { verifyPassword } from "@/lib/utils";
import { signInSchema } from "@/schemas/user";
  
export default async function POST(req: Request) {
  try {
    const jsonData = await req.json();
    console.log({jsonData})
    const validated = signInSchema.safeParse(jsonData);

    if (!validated.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid input",
          user: null,
        },
        {
          status: 400,
        }
      );
    }

    const { identifier, password } = validated.data;

    // check for existing user
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    // Handle case when user does not exist
    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message:
            "No account found with the provided email or username. Please sign up or use a different credential.",
          user: null,
        },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    // Verify password
    const isPasswordMatched = await verifyPassword(password, existingUser.password);

    if (!isPasswordMatched) {
      return Response.json(
        {
          success: false,
          message: "The password you entered is incorrect. Please try again.",
          user: null,
        },
        { status: HttpStatusCode.UNAUTHORIZED }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Login successful! Welcome back.",
        user: {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
          profileImage: existingUser.profileImage,
        },
      },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    
    return Response.json(
      {
        success: false,
        message:
          "An unexpected error occurred while processing your request. Please try again later.",
        user: null,
      },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}



