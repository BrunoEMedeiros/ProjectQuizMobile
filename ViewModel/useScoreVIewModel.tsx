import { scoreSchema, ScoreType } from "@/schemas/Score.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AxiosError } from "axios";
import { api } from "@/utils/axios.config";

export const useScoreViewModel = () => {
    const [scoreCard, setScoreCard] = useState<any | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ScoreType>({
        resolver: zodResolver(scoreSchema) as unknown as Resolver<ScoreType>,
        defaultValues: {
            id: uuidv4(),
            nome: "",
            acertos: 0,
        },
    });

    const onSubmit = async (data: ScoreType) => {
        try {
            const response = await api.get("/scores", {
                params: { id_user: data.id },
            });

            const result = response.data;

            // Atualiza o scoreCard com os dados da API e o nome do front
            setScoreCard({
                id: data.id,
                nome: data.nome,
                acertos: result[0]?.acertos ?? 0, // retorna acertos
            });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                console.error("Erro na API:", error.response?.data || error.message);
            } else {
                console.error("Erro inesperado:", error);
            }
        }
    };

    return {
        control,
        handleSubmit,
        errors,
        onSubmit,
        scoreCard,
    };
};

export default useScoreViewModel;
