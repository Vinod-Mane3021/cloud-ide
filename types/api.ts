import { HttpStatus, HttpStatusCode } from "@/constants/http-status";

export type ApiResponseType = {
  success: boolean;
  statusCode: HttpStatusCode;
  status: HttpStatus;
  message: string;
  data?: any;
};
