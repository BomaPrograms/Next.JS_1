import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const listBookPageRouter = createTRPCRouter({
  getlistBookPage: publicProcedure.query(({ ctx }) => {
    ctx.db.book;
    return {
      data: [{
        bookId: "",
        bookName: "",
      }],
    };
  }),
});