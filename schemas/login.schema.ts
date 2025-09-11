import z from "zod";

export const loginSchema = z.object({
  email: z.email("Email invalido").min(1, "Não pode ser vazio").trim(),
  senha: z.string().trim().min(5, "Senha deve ter 5 caracteres"),
});

export type LoginType = z.infer<typeof loginSchema>;
