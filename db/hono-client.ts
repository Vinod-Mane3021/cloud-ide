import { hc } from "hono/client";
import { RoutesType } from "@/app/api/[[...route]]/route";

export const hono_client = hc<RoutesType>(process.env.NEXT_PUBLIC_APP_URL!)
