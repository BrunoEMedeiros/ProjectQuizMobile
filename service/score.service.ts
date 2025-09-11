import { ScoreType } from "@/schemas/Score.schema";
import { api } from "@/utils/axios.config";
import { AxiosError } from "axios";

type ScoreResponse = {
    id: string;
    nome: string;
    acertos: number;
};

export async function handleScore(scoreData: ScoreType): Promise<ScoreResponse> {
    try {
        const response = await api.get(`/acertos`, {
            params: { id_user: scoreData.id,}
        });

        return response.data as ScoreResponse;

    } catch (error) {
        if (error instanceof AxiosError) {
            const message = error.response?.data?.message ||
                error.response?.data?.error ||
                'Erro ao consultar score';
            throw new Error(message);
        }
        throw new Error('Erro inesperado');
    }
}