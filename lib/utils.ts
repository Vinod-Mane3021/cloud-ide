import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Function to hash a password
 * @param plainPassword - The plain text password to hash
 * @returns {Promise<string>} - The hashed password
 */
export const hashPassword = async (
  plainPassword: string | null | undefined
): Promise<string | null> => {
  try {
    if (plainPassword) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const pwHash = await bcrypt.hash(plainPassword, salt);
      return pwHash;
    }
    return null;
  } catch (error) {
    console.log("Error while hashing the password ", error);
    throw new Error("Error while hashing the password");
  }
};

/**
 * Function to verify a password against a hashed password
 * @param plainPassword - The plain text password entered by the user
 * @param hashedPassword - The hashed password stored in the database
 * @returns {Promise<boolean>} - Returns true if the password matches, otherwise false
 */
export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string | null
): Promise<boolean> => {
  if (hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }
  return false;
};
