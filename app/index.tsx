import useScoreViewModel from "@/ViewModel/useScoreVIewModel";
import { Controller } from "react-hook-form";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ScorePage = () => {
  const { data, isError, error, status } = useScoreViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Ranking de pontuação</Text>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.nome}</Text>
                <Text>{item.total_acertos}</Text>
              </View>
            );
          }}
          ListEmptyComponent={() => <Text>Nenhuma pontuação...</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  card: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
