import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Alternatives = {
  alt_a: string;
  alt_b: string;
  alt_c: string;
  alt_d: string;
  alt_e: string;
};
const AlternativesButton = ({  alt_a,  alt_b,  alt_c,  alt_d,  alt_e }: Alternatives) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#3B82F6" }}>
      
      <TouchableOpacity><Text>{alt_a}</Text></TouchableOpacity>
      <TouchableOpacity><Text>{alt_b}</Text></TouchableOpacity>
      <TouchableOpacity><Text>{alt_c}</Text></TouchableOpacity>
      <TouchableOpacity><Text>{alt_d}</Text></TouchableOpacity>
      <TouchableOpacity><Text>{alt_e}</Text></TouchableOpacity>
    </View>
  );
};



export default AlternativesButton;