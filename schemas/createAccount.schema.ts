import z from "zod";

export const createAccountSchema = z
  .object({
    email: z.email("Email invalido").min(1, "Não pode ser vazio").trim(),
    senha: z.string().min(5, "Senha deve ter 5 caracteres").trim(),
    confSenha: z.string().min(5, "Senha deve ter 5 caracteres").trim(),
    nome: z.string().min(5, "Nome deve ter no minimo 5 caracteres").trim(),
  })
  .refine(
    (data) => data.senha === data.confSenha, // Validation check
    {
      message: "Senhas devem ser iguais", // Error message
      path: ["confSenha"], // Path to attach the error
    }
  );

export type CreateAccountType = z.infer<typeof createAccountSchema>;
