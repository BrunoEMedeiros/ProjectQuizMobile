import { loginSchema, LoginType } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { handleLogin } from "@/service/login.service";
import { useSnackBarContext } from "@/context/snackbar.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "@/utils/async-storage";
import { router } from "expo-router";

export const useLoginViewModel = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const { notify } = useSnackBarContext();

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

  const authUser = useMutation({
    mutationKey: ["auth"],
    mutationFn: async ({ email, senha }: LoginType) =>
      await handleLogin({ email: email, senha: senha }),
    onSuccess: async (data) => {
      if (data) {
        await storeData(data.id_user.toString());
        router.replace("/quiz");
      } else {
        notify({
          message: "Usuario ou senha incorretos",
          type: "info",
          open: true,
        });
      }
    },
    onError: (data) => {
      console.error("Unecxpected server error" + data);
    },
  });

  const onSubmit = (data: LoginType) => {
    authUser.mutate(data);
  };

  return {
    onSubmit,
    passwordVisible,
    setPasswordVisible,
    control,
    errors,
    handleSubmit,
  };
};

export default useLoginViewModel;
