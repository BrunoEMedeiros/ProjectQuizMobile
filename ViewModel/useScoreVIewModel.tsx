import { scoreSchema, ScoreType } from "@/schemas/Score.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
            const response = await axios.post("http://192.168.1.10/acertos", {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_user: data.id,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Erro ao consultar acertos");
            }

            // junta o que veio do backend com os dados do usuário
            setScoreCard({
                ...data,
                acertos: result[0]?.acertos ?? 0,
            });
        } catch (error) {
            console.error("Erro:", error);
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
