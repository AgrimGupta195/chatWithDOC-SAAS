import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
    publicRoutes: ["/"]
});

export const config = {matcher: [
    // Match all routes except static files and internal Next.js files
    '/((?!_next|.*\\.(?:ico|png|jpg|jpeg|webp|svg|css|js|json|txt|ttf|woff|woff2|eot|map|xml|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    // Always include API and tRPC routes
    '/(api|trpc)(.*)',],
};
