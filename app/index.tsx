import React from "react";
import { Pressable, Text, View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useScoreViewModel from "@/ViewModel/useScoreVIewModel";
import RankingCard from "@/components/RankingCard/RankingCard";
const ScorePage = () => {
  const { userId, data, isError, error, status } = useScoreViewModel();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View className="justify-between items-center p-8 gap-4">
        <Pressable
          onPress={async () => {
            if (await userId) {
              return router.push("/quiz");
            }
            return router.push("/login");
          }}
          className="w-full h-16 justify-center items-center rounded-lg"
          style={{ backgroundColor: "#FFC31F", elevation: 6 }}
        >
          <Text className="text-xl">Jogar</Text>
        </Pressable>
        <Text style={{ marginTop: 30, fontSize: 50 }}>🏆</Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.id_user.toString()}
        data={data}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1 }}
        columnWrapperStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <RankingCard
              score={item.total_acertos}
              name={item.nome}
              index={index}
            />
          );
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 10, width: 10 }}></View>
        )}
      />
    </View>
  );
};

export default ScorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#a6e1fa",
    paddingBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 22,
    textAlign: "center",
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
