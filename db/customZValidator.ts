import { ValidationTargets } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";


export const customZValidator = <T extends z.ZodType<any, z.ZodTypeDef, any>>(
  target: keyof ValidationTargets,
  schema: T
) => {
  const result = zValidator(target, schema, (result, c) => {
    // console.log({ result });
    if (!result.success) {
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
