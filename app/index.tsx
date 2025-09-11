import React from "react";
import { Pressable, Text, View } from "react-native";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import useLoginViewModel from "@/ViewModel/useLoginViewModel";
import { useSnackBarContext } from "@/context/snackbar.context";
import { useRouter } from "expo-router";

export default function App() {
  const {
    onSubmit,
    passwordVisible,
    setPasswordVisible,
    control,
    errors,
    handleSubmit,
  } = useLoginViewModel();

  const { message, type, open, notify } = useSnackBarContext();

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Ranking de pontuação</Text>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <TextInput
                mode="outlined"
                label="Senha"
                value={value}
                onChangeText={onChange}
                secureTextEntry={passwordVisible}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye" : "eye-off"}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
            );
          }}
        />
        {errors.senha && (
          <Text className="color-rose-700">{errors.senha.message}</Text>
        )}
        <Button
          icon="login"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          buttonColor="#1591EA"
          style={{ width: "60%", alignSelf: "center" }}
        >
          <Text className="text-xl">Entrar</Text>
        </Button>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => router.navigate("/cadastro")}
        >
          <Text className="text-center text-xl">Cadastre-se</Text>
        </Pressable>
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
    marginBottom: 22,
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
