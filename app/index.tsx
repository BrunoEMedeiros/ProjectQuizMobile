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
    marginBottom: 16,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 40,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    elipseContainer: {
        alignItems: "center",
    },
    elipse: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    acertosText: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#333",
    },
    userName: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 4,
    },
    userPosition: {
        fontSize: 18,
        color: "#666",
    },
});