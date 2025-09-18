import { api } from "@/utils/axios.config";
import { AxiosError } from "axios";

type Pergunta = {
  id_quest: number;
  enunciado: string;
  alt_a: string;
  alt_b: string;
  alt_c: string;
  alt_d: string;
  alt_e: string;
};

// type fetchPerguntasProps = {
//     perguntas: string,
//     alternativa_a: string,
//     alternativa_b: string,
//     alternativa_c: string,
//     alternativa_d: string,
// }

export async function fecthPerguntas(): Promise<Pergunta[] | null> {
  try {
    const { data } = await api.get<Pergunta[] | null>("/perguntas");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status == 500) {
        return null;
      } else {
        console.error("Unexpected error:", error);
      }
    }
    return null;
  }
}
