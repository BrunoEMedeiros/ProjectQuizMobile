import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {useQuizViewModel} from "@/ViewModel/useQuizViewModel";
import { Portal, Snackbar,} from "react-native-paper";
import { boolean } from "zod";

export default function QuizModal({ visible, }: { visible: boolean; onClose: () => void }) {
  const { perguntas, isError, error } = useQuizViewModel();

  function notify(arg0: { message: null; open: boolean; type: string; }) {
    throw new Error("Function not implemented.");
  }

  return (
    <View>
 <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Hora do Quiz!</Text>

          {isError ? (
            <Text style={styles.error}>Erro: {String(error)}</Text>
          ) : !perguntas.length ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={perguntas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.questionCard}>
                  <Text style={styles.question}>
                    {index + 1}. {item.pergunta}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
     <Portal>
        {open() ? (
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
            } }
            wrapperStyle={{ bottom: 40, alignSelf: "stretch" }} children={undefined}          >
          </Snackbar>
        ) : null}
      </Portal>

    </View>
   
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // fundo semi-transparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "#1E3A8A", // azul (tailwind: blue-900)
    borderRadius: 12,
    padding: 20,
    elevation: 5,
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
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  question: {
    fontSize: 16,
    color: "#fff",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 20,
  },
 
});

