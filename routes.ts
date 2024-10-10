/**
 * An array of routes that are accessible for the public
 * These routes do not requires authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = ["/sign-in", "/sign-up"];

/**
 * The prefix for api authentication routes
 * routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The prefix for http api route
 * routes that starts with this prefix are used to make http requests
 * @type {string}
 */
export const apiHttpPrefix: string = "/api"

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";

