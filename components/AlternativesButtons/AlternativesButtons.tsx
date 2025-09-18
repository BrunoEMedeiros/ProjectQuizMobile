import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, } from "react-native";
import { Button } from "react-native-paper";

type Alternatives = {
  alt_a: string;
  alt_b: string;
  alt_c: string;
  alt_d: string;
  alt_e: string;
};
const AlternativesButton = ({ alt_a, alt_b, alt_c, alt_d, alt_e }: Alternatives) => {
  return (
    <View style={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 15,
      marginTop: 40,
    }}>
      <TouchableOpacity style={{
        backgroundColor: "#3B82F6",
        padding: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "48%"
      }} onPress={() => {}}><Text style={{ color: "#fff",
        textAlign: "center",}}> A. {alt_a}</Text></TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: "#3B82F6",
        padding: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "48%"
      }}><Text style={{ color: "#fff",
        textAlign: "center",}}>B. {alt_b}</Text></TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: "#3B82F6",
        padding: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "48%"
      }}><Text style={{ color: "#fff",
        textAlign: "center",}}> C.{alt_c}</Text></TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: "#3B82F6",
        padding: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "48%"
      }}><Text style={{
        color: "#fff",
        textAlign: "center",
      }}>D.{alt_d}</Text></TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: "#3B82F6",
        padding: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 100,
        width: "48%"
      }}><Text style={{ color: "#fff",
        textAlign: "center",}}> E. {alt_e}</Text></TouchableOpacity>
    </View>
  );
};



export default AlternativesButton;