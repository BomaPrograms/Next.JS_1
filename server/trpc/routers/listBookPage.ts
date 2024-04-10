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
  })
//   updateBook: publicProcedure.mutation(
//     z.object({
//       bookId: z.string(),
//       bookName: z.string(),
//     }),
//     ({  }) => {
//       return { success: true };
//     }
//   ),
// });