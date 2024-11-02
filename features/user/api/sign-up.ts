
type RequestType = InferRequestType<
  (typeof hono_client.api.user)["sign-up"]["$post"]
>["json"];

type ResponseType = InferResponseType<
  (typeof hono_client.api.user)["sign-up"]["$post"]
>;

export const createUser = async (json: RequestType): Promise<ResponseType> => {
  try {
    const response = await fetch("");
    const data = await response.json();
    console.log({ createUser: data });
    return data;
  } catch (error) {
    console.error("Error in creating user ", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while processing your request. Please try again later.",
    };
  }
};
