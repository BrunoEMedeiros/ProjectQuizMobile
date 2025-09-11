import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export default function Header(props: NativeStackHeaderProps) {
  const canGoBack = props.navigation.canGoBack();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
          justifyContent: canGoBack ? "space-around" : "center",
        },
      ]}
    >
      {canGoBack ? (
        <Pressable onPress={() => props.navigation.goBack()}>
          <Feather name="arrow-left" size={32} color="black" />
        </Pressable>
      ) : null}
      <Image
        style={styles.headerLogo}
        source={require("../../assets/logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f2ff",
    // justifyContent: "space-around",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerButton: {
    backgroundColor: "#4d94ff",
    borderRadius: 8,
    padding: 12,
  },
  headerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerLogo: {
    width: 100,
    height: 130,
    resizeMode: "cover",
  },
});
