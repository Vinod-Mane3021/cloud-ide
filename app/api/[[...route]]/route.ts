import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from './user'

const app = new Hono().basePath("/api");

const routes = app
    .route("/user", user)

export const GET = handle(app)
export const POST = handle(app)

export type RoutesType = typeof routes;