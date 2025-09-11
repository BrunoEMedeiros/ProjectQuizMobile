import React from "react";
import { Text, View } from "react-native";

type RankingCardProps = {
  score: number;
  name: string;
};
const RankingCard = ({ score, name }: RankingCardProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#2B4162" }}>
      <Text>{score}</Text>
      <Text>{name}</Text>
    </View>
  );
};

export default RankingCard;
