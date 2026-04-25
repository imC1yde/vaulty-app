import { z } from "zod"

export const gameFilterSchema = z.object({
  name: z.string().nullable(),
  rating: z.number().min(0).max(10).nullable(),
  isCompleted: z.boolean().nullable(),
  genres: z.array(z.string()).nullable(),
  platforms: z.array(z.string()).nullable(),
  esrbRating: z.string().nullable()
});

export type GameFilterSchema = z.infer<typeof gameFilterSchema>