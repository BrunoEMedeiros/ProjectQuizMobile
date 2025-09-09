import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { quizSchema } from "@/schemas/quiz.schema";
import { z } from "zod";
import axios from "axios";

export type QuizType = z.infer<typeof quizSchema>;

interface Pergunta {
  id: string;
  pergunta: string;
  status: string;
}

export const useQuizViewModel = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Pergunta[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    setValue,
    getValues,
  } = useForm<QuizType>({
    resolver: zodResolver(quizSchema) as unknown as Resolver<QuizType>,
    defaultValues: {
      nome: "",
      
      respostas: [],
      score: undefined,
    },
  });

  // 🔹 Buscar perguntas da API usando Axios
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Pergunta[]>("http://localhost:3000/perguntas");
        const data = response.data;

        setQuestions(data);

        // Inicializa respostas no formulário
        reset({
          nome: "",
         
          respostas: data.map((q) => ({
            perguntaId: q.id,
            resposta: "",
          })),
          score: undefined,
        });
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, [reset]);


  return {
    onsubmit,
    isSubmitting,
    loadingQuestions,
    questions,
    register,
    control,
    errors,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
  };
};

export default useQuizViewModel;
