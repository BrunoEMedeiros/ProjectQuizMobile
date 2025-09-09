import React from "react";
import { Text, View } from "react-native";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import useLoginViewModel from "@/ViewModel/useLoginViewModel";
import { useSnackBarContext } from "@/context/snackbar.context";

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
      <Portal>
        {open ? (
          <Snackbar
            visible={open}
            theme={{
              colors: {
                inverseSurface: "#070A0E", // Background color
                inverseOnSurface: "#F2F3F4", // Text/icon color
              },
            }}
            onDismiss={() => {
              notify({ message: null, open: false, type: "info" });
            }}
            wrapperStyle={{ bottom: 40, alignSelf: "stretch" }}
          >
            {message}
          </Snackbar>
        ) : null}
      </Portal>
    </View>
  );
}
