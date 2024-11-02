import { ApiResponseType } from "@/types/api";

/**
 * Custom Response class for standardizing API responses,
 * including success status, HTTP status code, message, and optional data.
 */
export class ApiResponse extends Response {
  constructor({ statusCode, status, message, data, success }: ApiResponseType) {
    super(
      JSON.stringify({
        success,
        statusCode,
        status,
        message,
        data,
      }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
