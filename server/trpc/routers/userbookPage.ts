import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userbookPageRouter = createTRPCRouter({
  getUserBookPage: publicProcedure.query(({ ctx }) => {
    ctx.db.book;
    return {
      data: {
        userId: "",
        bookId: "",
        user: "",
        book: "",
      },
    };
  }),
});
