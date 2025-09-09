import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Controller, Resolver, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function App() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const loginSchema = z.object({
    email: z.email().min(1, "Não pode ser vazio"),
    senha: z.string().min(5, "Senha deve ter 5 caracteres"),
  });

  type LoginType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    setValue,
    getValues,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema) as unknown as Resolver<LoginType>,
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl text-center">Junte-se ao Photo</Text>
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
