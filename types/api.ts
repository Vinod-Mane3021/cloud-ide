import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { ZodIssue } from "zod";

export type ApiResponseType = {
  success: boolean;
  statusCode: HttpStatusCode;
  status: HttpStatus;
  message: string
  data?: any;
  errors?: ZodIssue[];
};
