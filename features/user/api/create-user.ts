import { hono_client } from "@/db/hono-client";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof hono_client.api.user)["create"]["$post"]
>["json"];

type ResponseType = InferResponseType<
  (typeof hono_client.api.user)["create"]["$post"]
>;

export const createUser = async (json: RequestType): Promise<ResponseType> => {
  try {
    const response = await hono_client.api.user["create"]["$post"]({ json });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in creating user ", error)
    return {
      success: false,
      message: "An unexpected error occurred while processing your request. Please try again later.",
    };
  }
};
