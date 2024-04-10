import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const listBookPageRouter = createTRPCRouter({
  getBookPage: publicProcedure.query(({ ctx }) => {
    ctx.db.book;
    return {
      data: {
        bookId: "",
        bookName: "",
      },
    };
  }),
});
