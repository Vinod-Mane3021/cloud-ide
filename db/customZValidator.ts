import { Context, MiddlewareHandler, Env, ValidationTargets } from "hono";
import { z, ZodError } from "zod";
import { zValidator } from "@hono/zod-validator";

type CustomHook<T, E extends Env, P extends string> = (
  result: {
    success: boolean;
    data?: T;
    error?: ZodError;
  },
  c: Context<E, P>
) => Response | void | Promise<Response | void>;

export const customZValidator = <
  T extends z.ZodType<any, z.ZodTypeDef, any>,
  E extends Env,
  P extends string
>(
  target: keyof ValidationTargets,
  schema: T,
  hook?: CustomHook<z.TypeOf<T>, E, P>
) => {
  const result = zValidator(target, schema, (result, c) => {
    console.log({ result });
    if (!result.success) {
      const formattedErrors = result.error.errors.map((err) => ({
        // field: err.path[0], // Use the field name from the path
        message: err.message, // Get the error message
      }));

      return c.json(
        {
          success: result.success,
          message: "Invalid input provided",
        },
        400
      );
    }
  });

  return result;
};
