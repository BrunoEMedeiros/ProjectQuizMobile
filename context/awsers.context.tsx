import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type AnwserAlts = "a" | "b" | "c" | "d" | "e";

type QuestAnwser = {
  id_quest: number;
  resposta: string;
};

type AnwsersContextType = {
  anwsers: QuestAnwser[];
  selectedAlternative: string;
  id_quest: number;
  setQuest: (params: number) => void;
  setAlt: (params: string) => void;
  handleAnswer: (params: QuestAnwser) => void;
  removeAnswer: (id_quest: number) => void;
  resetAnwsersState: () => void;
};

const AnwsersContext = createContext<AnwsersContextType>(
  {} as AnwsersContextType
);

export const AnwserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [anwsers, setAnwsers] = useState<QuestAnwser[]>([]);
  const [selectedAlternative, setAlternative] = useState<string>("");
  const [id_quest, setIdQuestion] = useState<number>(0);

  const handleAnswer = ({ id_quest, resposta }: QuestAnwser): void => {
    setAnwsers((prevAnwsers) => {
      const existingAnswerIndex = prevAnwsers.findIndex(
        (answer) => answer.id_quest === id_quest
      );

      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnwsers = [...prevAnwsers];
        updatedAnwsers[existingAnswerIndex] = {
          ...updatedAnwsers[existingAnswerIndex],
          resposta,
        };
        return updatedAnwsers;
      } else {
        // Add new answer
        return [...prevAnwsers, { id_quest, resposta }];
      }
    });
  };

  const removeAnswer = async (id_quest: number): Promise<void> => {
    setAnwsers((prevItems) =>
      prevItems.filter((item) => item.id_quest !== id_quest)
    );
  };

  const setAlt = (alt: string): void => {
    setAlternative(alt);
  };

  const setQuest = (id: number): void => {
    setIdQuestion(id);
  };

  const resetAnwsersState = (): void => {
    setAnwsers([]);
    setAlternative("");
    setIdQuestion(0);
  };

  return (
    <AnwsersContext.Provider
      value={{
        anwsers,
        handleAnswer,
        removeAnswer,
        selectedAlternative,
        setAlt,
        id_quest,
        setQuest,
        resetAnwsersState,
      }}
    >
      {children}
    </AnwsersContext.Provider>
  );
};

export const useAnwserQuestionContext = () => {
  const context = useContext(AnwsersContext);
  return context;
};
