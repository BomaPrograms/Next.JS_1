import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    ctx.db.user;
    return {
      data: {
        name: "",
        dob: "",
        age: "",
      },
    };
  }),
});