import { z } from "zod";

export const gameEndedSchema = z.object({
  timeEnded: z.date(),
  gameId: z.string(),
});
