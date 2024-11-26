import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { db } from "@/db/prisma-client";
import { withApiHandler } from "@/lib/api-handler";
import { ApiResponse, ValidationErrorApiResponse } from "@/lib/api-response";
import { verifyPassword } from "@/lib/utils";
import { logger } from "@/logger";
import { signInSchema } from "@/schemas/user";

export const POST = withApiHandler(async (req: Request) => {
  const jsonData = await req.json();
  
  // Validate the input data against the schema
  const validated = signInSchema.safeParse(jsonData);
  if (!validated.success) {
    return new ValidationErrorApiResponse();
  }

  const { identifier, password } = validated.data;

  // Check for existing user by email or username
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  // Handle case when user does not exist
  if (!existingUser) {
    return new ApiResponse({
      success: false,
      message: "No account found with the provided email or username. Please sign up or use a different credential.",
      status: HttpStatus.ACCOUNT_NOT_FOUND,
      statusCode: HttpStatusCode.NOT_FOUND,
    });
  }

  // Check if the user is associated with a third-party provider.
  if (existingUser.provider !== "credentials") {
    return new ApiResponse({
      success: false,
      message: `This account is linked to ${existingUser.provider}. Please sign in using ${existingUser.provider} or create a new account.`,
      status: HttpStatus.UNAUTHORIZED,
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }

  // Verify the provided password against the stored password
  const isPasswordMatched = await verifyPassword(
    password,
    existingUser.password
  );
  if (!isPasswordMatched) {
    return new ApiResponse({
      success: false,
      message: "The password you entered is incorrect. Please try again.",
      status: HttpStatus.PASSWORD_NOT_MATCHED,
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }

  // Successful login response
  return new ApiResponse({
    success: true,
    message: "Login successful! Welcome back.",
    status: HttpStatus.SUCCESS,
    statusCode: HttpStatusCode.OK,
    data: {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.username,
      image: existingUser.profileImage,
    }
  });
});


