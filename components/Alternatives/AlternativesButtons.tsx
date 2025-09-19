import { useAnwserQuestionContext } from "@/context/awsers.context";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Alternatives = {
  id_quest: number;
  alts: string[];
  selectAlt: Function;
  selectedAlt: string;
};
//  selected: React.Dispatch<React.SetStateAction<string[]>>;

// type AlternativeChoice = {
//   id_quest: number;
//   resposta: string;
// };

const AlternativesButton = ({
  id_quest,
  alts,
  selectAlt,
  selectedAlt,
}: Alternatives) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 15,
        marginTop: 40,
      }}
    >
      {alts.map((alternative, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={{
              backgroundColor:
                selectedAlt == String.fromCharCode(97 + i)
                  ? "#FFC31F"
                  : "#3B82F6",
              padding: 30,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              width: 180,
              height: 110,
            }}
            onPress={() => {
              selectAlt(String.fromCharCode(97 + i));
            }}
          >
            <Text
              adjustsFontSizeToFit
              style={{ color: "#fff", textAlign: "center" }}
            >
              {alternative}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AlternativesButton;
