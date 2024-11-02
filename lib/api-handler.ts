import { auth } from "@/auth";
import { ApiResponse } from "./api-response";
import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { logger } from "@/logger";
import { errorMessage } from "@/constants/messages";

export const withApiHandler = (
  handler: (req: Request) => Promise<ApiResponse>
) => {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      logger.error("Error during API request:", error);
      return new ApiResponse({
        success: false,
        message: errorMessage.serverError,
        status: HttpStatus.SERVER_ERROR,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      });
    }
  };
};

export const withAuthorizedHandler = (
  handler: (req: Request) => Promise<ApiResponse>
) => {
  return withApiHandler(async (req: Request) => {
    const session = await auth();
    if (!session) {
      return new ApiResponse({
        success: false,
        message: errorMessage.unauthorizedAccess,
        status: HttpStatus.UNAUTHORIZED,
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    }

    return handler(req);
  });
};
