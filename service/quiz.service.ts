import { api } from "@/utils/axios.config";
import { AxiosError } from "axios";

export type Pergunta = {
  id_quest: number;
  enunciado: string;
  alt_a: string;
  alt_b: string;
  alt_c: string;
  alt_d: string;
  alt_e: string;
};

export type Answer = {
  id_quest: number;
  resposta: string;
};

export type QuestionCorrection = {
  id_user: number;
  respostas: Answer[];
};

export type CorrectionResponse = {
  mensagem: string;
  acertosTentativa: number;
  pontuacao: number;
};

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

export async function handleFinishQuiz({
  id_user,
  respostas,
}: QuestionCorrection) {
  try {
    const { data } = await api.post<CorrectionResponse>("/perguntas/correcao", {
      id_user,
      respostas,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}
