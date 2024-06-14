import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const nextUrlPathname = nextUrl.pathname;
            if(nextUrlPathname === '/app' || nextUrlPathname === '/app/') {
                return Response.redirect(new URL('/app/tracker', nextUrl));
            }
            else if(nextUrlPathname.startsWith('/app')) {
                if (isLoggedIn)
                    return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/app/tracker', nextUrl));
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
              token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if(session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;