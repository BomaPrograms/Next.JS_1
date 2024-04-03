import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookPageRouter = createTRPCRouter({
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
