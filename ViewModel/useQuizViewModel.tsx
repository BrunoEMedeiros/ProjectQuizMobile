import { quizSchema, QuizType } from "@/schemas/quiz.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { fecthPerguntas } from "@/service/quiz.service";
import { useSnackBarContext } from "@/context/snackbar.context";
import { getValueFromStorage } from "@/utils/async-storage";

export const useQuizViewModel = () => {
    const { notify } = useSnackBarContext();

    const {data, isError, error} = useQuery({
        queryKey: ["perguntas"],
        queryFn: fecthPerguntas,
        staleTime: 6000,
    })

    return {
         userId:
              getValueFromStorage().then((id) => {
                return id;
              }) || null,
        perguntas: data ? data : [],
        isError, 
        error,
    }
}
