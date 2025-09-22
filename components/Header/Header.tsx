import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { getValueFromStorage, removeData } from "@/utils/async-storage";
import { useRouter } from "expo-router";

export default async function Header(props: NativeStackHeaderProps) {
  const canGoBack = props.navigation.canGoBack();
  const insets = useSafeAreaInsets();

  const router = useRouter();

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
      {canGoBack && (await getValueFromStorage()) ? (
        <Pressable
          onPress={async () => {
            await removeData();
            router.dismissAll();
            router.replace("/");
          }}
          style={{ backgroundColor: "#fff", padding: 16, borderRadius: 20 }}
        >
          <Text style={{ fontSize: 16 }}>Sair</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0e6ba8",
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
