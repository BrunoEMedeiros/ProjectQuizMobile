import { api } from "@/utils/axios.config";
import { AxiosError } from "axios";

export type CreateAccountProps = {
  email: string;
  senha: string;
  nome: string;
};

export async function handleCreateAccount(
  props: CreateAccountProps
): Promise<number | null> {
  try {
    const { status } = await api.post("/usuario", {
      email: props.email,
      senha: props.senha,
      nome: props.nome,
    });

    return status;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status == 409) {
        return null;
      } else {
        console.error("Unexpected error:", error.response?.status);
      }
    }
    return null;
  }
}
