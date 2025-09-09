import React from "react";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import useLoginViewModel from "@/ViewModel/useLoginViewModel";

export default function App() {
  const {
    onSubmit,
    passwordVisible,
    setPasswordVisible,
    control,
    errors,
    handleSubmit,
  } = useLoginViewModel();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl text-center">Venha responder com a gente</Text>
      <View className="gap-4 p-6 w-full">
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
              
                mode="outlined"
                label="Email"
                value={value}
                onChangeText={onChange}
              />
            );
          }}
        />
        {errors.email && <Text>{errors.email.message}</Text>}
        <Controller
          name="senha"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
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
        {errors.senha && <Text>{errors.senha.message}</Text>}
        <Button
          icon="login"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          buttonColor="#1591EA"
          style={{ width: "80%", alignSelf: "center" }}
        >
          Entrar
        </Button>
      </View>
    </View>
  );
}
