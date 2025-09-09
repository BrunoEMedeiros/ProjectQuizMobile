import z from "zod";

export const quizSchema = z.object({
  nome: z.string().trim().min(1, "O nome é obrigatório"),
  respostas: z.array(
    z.object({

      resposta: z.string().min(1, "A resposta não pode ser vazia"),
    })
  ).min(1, "Você deve responder pelo menos uma pergunta"),
  score: z.number().min(0).optional(), 
});

export type QuizType = z.infer<typeof quizSchema>
