import { hc } from "hono/client";
import { RoutesType } from "@/app/api/[[...route]]/route";

export const honoClient = hc<RoutesType>(process.env.NEXT_PUBLIC_APP_URL!)
