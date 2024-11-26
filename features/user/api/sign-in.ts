import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { errorMessage } from "@/constants/messages";
import { ApiResponse } from "@/lib/api-response";
import { SignInType } from "@/schemas/user";
import { ApiResponseType } from "@/types/api";
import axios from "axios";

type RequestType = SignInType;
type ResponseType = ApiResponseType;

export const signInUser = async (json: RequestType): Promise<ResponseType> => {
  try {
    const endpoint = "http://localhost:3000/api/auth/sign-in";
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(json)
    });
    
    return await response.json()
  } catch (error) {
    console.error("Error in finding user ", error);
    return {
      success: false,
      message: errorMessage.serverError,
      status: HttpStatus.SERVER_ERROR,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
  }
};
