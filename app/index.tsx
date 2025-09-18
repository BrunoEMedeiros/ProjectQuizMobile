import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useQuizViewModel } from "@/ViewModel/useQuizViewModel";
import { Portal, Snackbar } from "react-native-paper";
import { useSnackBarContext } from "@/context/snackbar.context";
import AlternativesButton from "@/components/AlternativesButtons/AlternativesButtons";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
const { width, height } = Dimensions.get("window");


export default function QuizScreen() {
  const { perguntas, isError, error } = useQuizViewModel();
  const { message, open, notify } = useSnackBarContext();
  
  const flatListRef = useRef<FlatList<any> | null>(null);

    // uso seguro
    flatListRef.current?.scrollToIndex({ index: 0 });


  // const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () => {
  //   if (currentIndex < perguntas.length - 1) {
  //     const nextIndex = currentIndex + 1;
  //     setCurrentIndex(nextIndex);
  //     flatListRef.current?.scrollToIndex({ index: nextIndex });
  //   } else {
  //     notify({
  //       message: "Quiz finalizado!",
  //       type: "success",
  //       open: true,
  //     });
  //   }
  // };

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
      <Text style={styles.title}>Hora do Quiz!</Text>
      <FlatList
      style={{flex: 1}}
        keyExtractor={(item) =>
          item?.id_quest.toString() || Math.random().toString()
        }
        data={perguntas}
        horizontal
        scrollEnabled={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (<QuestionCard item={item} index={perguntas.length} currentIndex={index}  flatListRef={flatListRef} />)
        }}
      />

      
      {/* Snackbar */}
      <Portal>
        {open ? (
          <Snackbar
            visible={true}
            theme={{
              colors: {
                inverseSurface: "#070A0E",
                inverseOnSurface: "#F2F3F4",
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
    // paddingTop: 40,
    // paddingBottom: 40,
    // paddingHorizontal: 20,
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
    justifyContent:"flex-start",
    alignItems:"center",
     position: "absolute",
   top: 0,
  },
  question: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  nextButton: {
  backgroundColor: "#2563EB",
  padding: 40,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  width: "48%"
  },

  buttonsContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: 10,
  
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


// 