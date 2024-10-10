import { honoClient } from "@/db/hono-client";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof honoClient.api.user)["create"]["$post"]
>["json"];

type ResponseType = InferResponseType<
  (typeof honoClient.api.user)["create"]["$post"]
>;

export const createUser = async (json: RequestType): Promise<ResponseType> => {

    console.log({createUser: "createUser_createUser_createUser_createUser"})
  try {
    const response = await honoClient.api.user["create"]["$post"]({ json });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred while processing your request. Please try again later.",
    };
  }
};
