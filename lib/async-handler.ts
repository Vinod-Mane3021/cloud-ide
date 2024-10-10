import { Context } from "hono";

export const asyncHandler = async (fun: Function) => {
  return async (c: Context) => {
    try {
      await fun(c);
    } catch (error) {
      c.json({ error: "Error" }, 500);
    }
  };
};
