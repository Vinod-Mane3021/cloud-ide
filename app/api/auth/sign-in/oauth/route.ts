import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { db } from "@/db/prisma-client";
import { withApiHandler } from "@/lib/api-handler";
import { ApiResponse, ValidationErrorApiResponse } from "@/lib/api-response";
import { signInWithOauthProviderSchema } from "@/schemas/user";

export const POST = withApiHandler(async (req: Request) => {
  const jsonData = await req.json();

  // Validate the input data against the schema
  const validated = signInWithOauthProviderSchema.safeParse(jsonData);
  if (!validated.success) {
    const errors = validated.error.errors;
    return new ValidationErrorApiResponse(errors);
  }

  const { email, provider, providerId, username, profileImage } =
    validated.data;

  // Check for existing user by email or username
  const existingUser = await db.user.findFirst({
    where: { email },
  });

  // Handle case when user does not exist
  if (existingUser) {
    // Check if the user is associated with a third-party provider.
    if (existingUser.provider === "credentials") {
      return new ApiResponse({
        success: false,
        message: `This account is linked to ${existingUser.provider}. Please sign in using ${existingUser.provider} or create a new account.`,
        status: HttpStatus.UNAUTHORIZED,
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    console.log({
        existingUser
    })

    console.log("existingUser updating")

    const updated_existingUser = await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: { email, provider, providerId, username, profileImage },
    });

    console.log({
        updated_existingUser
    })

    if (!updated_existingUser) {
      return new ApiResponse({
        success: false,
        message: `user not updated`,
        status: HttpStatus.SERVER_ERROR,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      });
    }

     // Successful login response
    return new ApiResponse({
        success: true,
        message: "Login successful! Welcome back.",
        status: HttpStatus.SUCCESS,
        statusCode: HttpStatusCode.OK,
    });
  }

  console.log("new user updated")

  const new_user = await db.user.create({
    data: { email, provider, providerId, username, profileImage },
  });

  console.log({new_user})

  if (!new_user) {
    return new ApiResponse({
      success: false,
      message: `user not updated`,
      status: HttpStatus.SERVER_ERROR,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }

  // Successful login response
  return new ApiResponse({
    success: true,
    message: "Login successful! Welcome back.",
    status: HttpStatus.SUCCESS,
    statusCode: HttpStatusCode.OK,
  });
});
