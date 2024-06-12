export const publicRoutes = [
    "/",
]

/**
 * A bunch of routes that are not public and used for authentication. Logged in users will be redirected from thiese routes to the home page.
 */
export const authRoutes = [
    "/login",
]

export const redirectRoutes = [
    "/app",
]

export const DEFAULT_LOGIN_REDIRECT = "/app/tracker";

