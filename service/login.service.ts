import { LoginType } from "@/schemas/login.schema";
import { api } from "@/utils/axios.config";
import { AxiosError } from "axios";

type LoginResponse = {
  id_user: number;
  nome: string;
  funcao: string;
};

export async function handleLogin({
  email,
  senha,
}: LoginType): Promise<LoginResponse | null> {
  try {
    const { data } = await api.post<LoginResponse | null>("/login", {
      email: email,
      senha: senha,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status == 401) {
        return null;
      } else {
        console.error("Unexpected error:", error);
      }
    }
    return null;
  }
}
