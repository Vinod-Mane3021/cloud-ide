import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { errorMessage } from "@/constants/messages";
import { ApiResponse } from "@/lib/api-response";
import { signInType } from "@/schemas/user";
import { ApiResponseType } from "@/types/api";
import axios from "axios";

type RequestType = signInType;
type ResponseType = ApiResponseType;

export const signInUser = async (json: RequestType): Promise<ResponseType> => {
  try {
    const endpoint = "http://localhost:3000/api/auth/sign-in";
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(json)
    });
    // const response = await axios.post(endpoint, json, {
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    // });
    
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
