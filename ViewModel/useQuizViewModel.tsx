import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fecthPerguntas,
  handleFinishQuiz,
  QuestionCorrection,
} from "@/service/quiz.service";
import { useSnackBarContext } from "@/context/snackbar.context";
import { getValueFromStorage } from "@/utils/async-storage";
import { FlatList } from "react-native";
import { useAnwserQuestionContext } from "@/context/awsers.context";

export const useQuizViewModel = () => {
  const { message, open, notify } = useSnackBarContext();
  const {
    handleAnswer,
    removeAnswer,
    selectedAlternative,
    setAlt,
    anwsers,
    resetAnwsersState,
  } = useAnwserQuestionContext();

  const flatListRef = useRef<FlatList<any> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const { data, isError, error } = useQuery({
    queryKey: ["perguntas"],
    queryFn: fecthPerguntas,
    staleTime: 6000,
  });

  const nextQuestion = () => {
    if (data) {
      if (selectedAlternative == "") {
        notify({
          message: "Selecione uma alternativa",
          open: true,
          type: "info",
        });
        return;
      }
      if (currentIndex < data.length - 1) {
        const actualAnswer = {
          id_quest: data![currentIndex].id_quest,
          resposta: selectedAlternative,
        };
        handleAnswer(actualAnswer);

        console.log([...anwsers, actualAnswer]);

        setAlt("");
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }
  };

  const prevQuestion = async () => {
    if (data) {
      removeAnswer(data[currentIndex - 1].id_quest);
      if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        flatListRef.current?.scrollToIndex({
          index: prevIndex,
          animated: true,
        });
      }
    }
  };

  const finishQuestionary = async () => {
    const finalAnswer = {
      id_quest: data![currentIndex].id_quest,
      resposta: selectedAlternative,
    };

    handleAnswer(finalAnswer);

    const completeAnswers = [...anwsers, finalAnswer];
    const id_user = await getValueFromStorage();
    if (id_user) {
      answersCorrection.mutate({
        id_user: parseInt(id_user),
        respostas: completeAnswers,
      });
    }
    resetAnwsersState();
  };

  const answersCorrection = useMutation({
    mutationKey: ["answersCorrection"],
    mutationFn: async ({ id_user, respostas }: QuestionCorrection) =>
      await handleFinishQuiz({ id_user: id_user, respostas: respostas }),
    onSuccess: async (data) => {
      if (data) {
        setOpenModal(!openModal);
        return data;
      } else {
        notify({
          message: "Erro inesperado",
          type: "error",
          open: true,
        });
      }
    },
    onError: (data) => {
      console.error("Unecxpected server error" + data);
    },
  });

  return {
    userId:
      getValueFromStorage().then((id) => {
        return id;
      }) || null,
    perguntas: data ? data : [],
    isError,
    error,
    message,
    open,
    notify,
    flatListRef,
    currentIndex,
    setCurrentIndex,
    nextQuestion,
    prevQuestion,
    finishQuestionary,
    correction: answersCorrection.data || null,
    openModal,
    setOpenModal,
  };
};
