import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { ApiResponseType } from "@/types/api";
import { ZodIssue } from "zod";

/**
 * Custom Response class for standardizing API responses,
 * including success status, HTTP status code, message, and optional data.
 */
export class ApiResponse extends Response {
  constructor({ statusCode, status, message, data, success, errors }: ApiResponseType) {
    super(
      JSON.stringify({
        success,
        statusCode,
        status,
        message,
        data,
        errors
      }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


export class ValidationErrorApiResponse extends ApiResponse {
  constructor(errors?: ZodIssue[]) {
    super({
      success: false,
      message: "Please ensure that all required fields are filled in correctly",
      status: HttpStatus.INVALID_INPUTS,
      statusCode: HttpStatusCode.BAD_REQUEST,
      errors
    })
  }
}


