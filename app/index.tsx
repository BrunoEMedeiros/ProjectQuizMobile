import React from "react";
import { Pressable, Text, View, FlatList, StyleSheet } from "react-native";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import useLoginViewModel from "@/ViewModel/useLoginViewModel";
import { useSnackBarContext } from "@/context/snackbar.context";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useScoreViewModel from "@/ViewModel/useScoreVIewModel";
import RankingCard from "@/components/RankingCard/RankingCard";
import { getValueFromStorage } from "@/utils/async-storage";
const ScorePage = () => {
  const { userId, data, isError, error, status } = useScoreViewModel();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View className="flex-row justify-between items-center p-8">
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit={true}
          style={styles.title}
        >
          Melhores pontuações
        </Text>
        <Pressable
          onPress={async () => {
            if (await userId) {
              return router.push("/quiz");
            }
            return router.navigate("/login");
          }}
          className="bg-black w-24 h-16 justify-center items-center border rounded-md"
        >
          <Text className="text-white">Jogar</Text>
        </Pressable>
      </View>
      <FlatList
        keyExtractor={(item) => item.id_user.toString()}
        data={data}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1 }}
        columnWrapperStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <RankingCard score={item.total_acertos} name={item.nome} />;
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 22,
    textAlign: "center",
    color: "#FA9F42",
    width: 160,
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
