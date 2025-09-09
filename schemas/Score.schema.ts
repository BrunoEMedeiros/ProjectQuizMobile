import { z } from "zod";

export const scoreSchema = z.object({
    id: z.string(),
    nome: z.string().min(1, "Não pode ser vazio"),
    acertos: z.number().positive
});

export type ScoreType = z.infer<typeof scoreSchema>;
