import { postRouter } from "./routers/post";
import { userRouter } from "./routers/users";
import { userPageRouter } from "./routers/userPage";
import { bookPageRouter } from "./routers/bookPage";
import { userbookPageRouter } from "./routers/userbookPage";
import { userEmailPageRouter } from "./routers/userEmailPage";
import { listBookPageRouter } from "./routers/listBookPage";
import { createTRPCRouter, createCallerFactory } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /trpc/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    post: postRouter,
    user: userRouter,
    userPage: userPageRouter,
    bookPage: bookPageRouter,
    userbookPage: userbookPageRouter,
    userEmailPage: userEmailPageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
