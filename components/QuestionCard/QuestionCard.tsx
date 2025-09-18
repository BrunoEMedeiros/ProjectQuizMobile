import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import AlternativesButton from "../AlternativesButtons/AlternativesButtons";

type QuestionItem = {
    id_quest: number;
    enunciado: string;
    alt_a: string;
    alt_b: string;
    alt_c: string;          
    alt_d: string;
    alt_e: string;
}

type QuestionCardProps = {
    item: QuestionItem;
    index: number;
    currentIndex: number;
    flatListRef: React.RefObject<FlatList<any> | null>;
}

    const { width, height } = Dimensions.get("window");

const QuestionCard = ({item, index, currentIndex, flatListRef}: QuestionCardProps) => {

  return ( <View style={[styles.page, { width }]}>
            <View style={styles.questionCard}>
              <Text style={styles.question}>
                {currentIndex + 1}. {item.enunciado}
              </Text>
            </View>
            <View style = {styles.buttonsContainer}>
            <AlternativesButton alt_a={item.alt_a} alt_b={item.alt_b} alt_c={item.alt_c} alt_d={item.alt_d} alt_e={item.alt_e} />
            <TouchableOpacity style={styles.nextButton} onPress={() => {    flatListRef?.current?.scrollToIndex({
                    animated: true,
                    index: currentIndex + 1
                });}}>
              <Text style={styles.nextButtonText}>
                {currentIndex < index - 1 ? "Próxima" : "Finalizar"}
              </Text>
            </TouchableOpacity>
            </View>
          </View>)}

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
          
          
export default QuestionCard;