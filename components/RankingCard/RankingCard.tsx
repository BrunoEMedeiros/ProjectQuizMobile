import React from "react";
import { Text, View } from "react-native";

type RankingCardProps = {
  score: number;
  name: string;
  index: number;
};
const RankingCard = ({ score, name, index }: RankingCardProps) => {
  return (
    <View
      className="justify-normal items-center"
      style={{
        flex: 1,
        backgroundColor: "#3b82f6",
        padding: 16,
        gap: 10,
        borderRadius: 20,
        width: 100,
        elevation: 4,
      }}
    >
      <View
        style={{
          borderRadius: 30,
          backgroundColor: "#FFD25A",
          minHeight: 50,
          minWidth: 50,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 20 }}>{score}</Text>
      </View>
      <Text style={{ fontStyle: "italic" }}>pontos</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 20 }}>
          {name}
        </Text>
      </View>
      {index <= 2 ? (
        <Text style={{ fontSize: 30 }}>
          {index == 0 ? "🥇" : index == 1 ? "🥈" : index == 2 ? "🥉" : null}
        </Text>
      ) : null}
    </View>
  );
};

export default RankingCard;
