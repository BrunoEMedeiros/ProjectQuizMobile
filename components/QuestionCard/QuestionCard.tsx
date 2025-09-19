import { View, Text, StyleSheet, Dimensions } from "react-native";
import AlternativesButton from "../Alternatives/AlternativesButtons";
import { useState } from "react";
import { useAnwserQuestionContext } from "@/context/awsers.context";

type QuestionItem = {
  id_quest: number;
  enunciado: string;
  alt_a: string;
  alt_b: string;
  alt_c: string;
  alt_d: string;
  alt_e: string;
};

type QuestionCardProps = {
  item: QuestionItem;
  currentIndex: number;
};

const { width } = Dimensions.get("window");

const QuestionCard = ({ item, currentIndex }: QuestionCardProps) => {
  const { selectedAlternative, setAlt } = useAnwserQuestionContext();

  return (
    <View style={[styles.page, { width }]}>
      <View style={styles.questionCard}>
        <Text style={styles.question} numberOfLines={5} adjustsFontSizeToFit>
          {currentIndex + 1}. {item.enunciado}
        </Text>
      </View>
      <View>
        <AlternativesButton
          id_quest={item.id_quest}
          alts={[item.alt_a, item.alt_b, item.alt_c, item.alt_d, item.alt_e]}
          selectAlt={setAlt}
          selectedAlt={selectedAlternative}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    flex: 1,
    padding: 16,
  },
  questionCard: {
    backgroundColor: "#3B82F6",
    padding: 20,
    borderRadius: 8,
    display: "flex",
    width: "100%",
  },
  question: {
    fontSize: 18,
    color: "#fff",
    textAlign: "justify",
  },
  nextButton: {
    backgroundColor: "#2563EB",
    padding: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default QuestionCard;
