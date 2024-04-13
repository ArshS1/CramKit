import { z } from "zod";

export const quizSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" }),
  type: z.enum(["multipleChoice", "openEnded"]),
  amount: z.number().int().min(1).max(10),
});
