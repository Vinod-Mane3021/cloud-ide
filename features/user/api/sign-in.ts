import { HttpStatus, HttpStatusCode } from "@/constants/http-status";
import { errorMessage } from "@/constants/messages";
import { SignInType, SignInWithOauthProviderType } from "@/schemas/user";
import { ApiResponseType } from "@/types/api";

type RequestType = SignInType;
type ResponseType = ApiResponseType;

export const signInUser = async (json: RequestType): Promise<ResponseType> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-in`;
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


export const signInWithOAuthProvider = async (json: SignInWithOauthProviderType): Promise<ResponseType> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-in/oauth`;
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(json)
    });
    
    return await response.json()
  } catch (error) {
    console.error("Error in creating user ", error);
    return {
      success: false,
      message: errorMessage.serverError,
      status: HttpStatus.SERVER_ERROR,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
  }
};