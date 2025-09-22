import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useQuizViewModel } from "@/ViewModel/useQuizViewModel";
import { Button, Portal, Snackbar, Modal } from "react-native-paper";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import { router } from "expo-router";
const { height } = Dimensions.get("window");

export default function QuizScreen() {
  const {
    perguntas,
    isError,
    error,
    message,
    open,
    notify,
    flatListRef,
    currentIndex,
    nextQuestion,
    prevQuestion,
    finishQuestionary,
    correction,
    openModal,
    setOpenModal,
  } = useQuizViewModel();

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

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Hora do Quiz!</Text> */}
      <FlatList
        ref={flatListRef}
        style={{ flex: 1 }}
        keyExtractor={(item) =>
          item?.id_quest.toString() || Math.random().toString()
        }
        data={perguntas}
        horizontal
        scrollEnabled={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View>
              <QuestionCard item={item} currentIndex={index} />
            </View>
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={prevQuestion}
          disabled={currentIndex === 0}
          style={{
            backgroundColor: currentIndex === 0 ? "#C7C0BD" : "#00072d",
            width: 140,
            height: 80,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#ffff", fontSize: 18 }}>Anterior</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            currentIndex + 1 < perguntas.length
              ? nextQuestion()
              : finishQuestionary();
          }}
          style={{
            backgroundColor:
              currentIndex + 1 < perguntas.length ? "#00072d" : "#17B890",
            width: 140,
            height: 80,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#ffff", fontSize: 18 }}>
            {currentIndex + 1 < perguntas.length ? "Proxima" : "Finalizar"}
          </Text>
        </Pressable>
      </View>

      {/* Snackbar */}
      <Portal>
        <Modal
          visible={openModal}
          onDismiss={() => {
            setOpenModal(!openModal);
            router.push("/");
          }}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, color: "#FFC31F", textAlign: "center" }}>
            Parabens! 🏆
          </Text>
          <Text style={{ fontSize: 20 }}>
            {correction?.acertosTentativa} acertos
          </Text>
        </Modal>
        {open ? (
          <Snackbar
            visible={true}
            duration={2000}
            theme={{
              colors: {
                inverseSurface: "#F2F3F4",
                inverseOnSurface: "#070A0E",
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A6E1FA", // fundo azul
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.5,
    flex: 1,
  },
  questionCard: {
    backgroundColor: "#3B82F6",
    padding: 20,
    borderRadius: 8,
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  question: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    marginBottom: 60,
  },
  // nextButton: {
  //   backgroundColor: "#2563EB",
  //   padding: 40,
  //   borderRadius: 8,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "48%",
  // },

  // buttonsContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  //   gap: 10,
  // },

  // nextButtonText: {
  //   color: "#fff",
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },
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
