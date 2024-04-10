import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userEmailPageRouter = createTRPCRouter({
  getUserEmailPage: publicProcedure.query(({ ctx }) => {
    ctx.db.userEmail;
    return {
      data: {
        id: "",
        email: "",
      },
    };
  }),
});
