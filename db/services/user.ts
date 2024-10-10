import { db } from "@/db/prisma-client";

export const getUserByEmailAndPwdService = async (
  email: string,
  hashedPassword: string | null | undefined
) => {
  const data = await db.user.findUnique({
    where: {
      email,
      password: hashedPassword,
    },
  });
  return data;
};
