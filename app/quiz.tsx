import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuizViewModel } from "@/ViewModel/useQuizViewModel";
import { Portal, Snackbar } from "react-native-paper";
import { useSnackBarContext } from "@/context/snackbar.context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuizScreen() {
  const { perguntas, isError, error } = useQuizViewModel();
  const { message, type, open, notify } = useSnackBarContext();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < perguntas.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      notify({
        message: "Quiz finalizado!",
        type: "success",
        open: true,
      });
    }
  };

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Erro: {String(error)}</Text>
      </View>
    );
  }

  if (!perguntas.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando perguntas...</Text>
      </View>
    );
  }

  const perguntaAtual = perguntas[currentIndex];

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.title}>Hora do Quiz!</Text>

      <View style={styles.questionCard}>
        <Text style={styles.question}>
          {currentIndex + 1}. {perguntaAtual.pergunta}
        </Text>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentIndex < perguntas.length - 1 ? "Próxima" : "Finalizar"}
        </Text>
      </TouchableOpacity>

      {/* Snackbar */}
      <Portal>
        {open ? (
          <Snackbar
            visible={true}
            theme={{
              colors: {
                inverseSurface: "#070A0E", // Background color
                inverseOnSurface: "#F2F3F4", // Text/icon color
              },
            }}
            onDismiss={() => {
              notify({ message: null, open: false, type: "info" });
            }}
            wrapperStyle={{ bottom: 40, alignSelf: "stretch" }}
          >
            {message}
          </Snackbar>
        ) : null}
      </Portal>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A", // fundo azul
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  questionCard: {
    backgroundColor: "#3B82F6", // azul claro
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  question: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
  },
});
