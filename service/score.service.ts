import { LoginType } from "@/schemas/login.schema";
import { api } from "@/utils/axios.config";
import { AxiosError } from "axios";

export type ScoreResponse = {
  id_user: number;
  nome: string;
  total_acertos: number;
};

export async function fecthScore(): Promise<ScoreResponse[]> {
  try {
    const { data } = await api.get<ScoreResponse[]>("/acertos");
    return data;
  } catch (error) {
    const resposta: ScoreResponse[] = [];
    console.error("Unexpected error:", error);
    return resposta;
  }
}