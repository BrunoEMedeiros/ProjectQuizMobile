import { useSnackBarContext } from "@/context/snackbar.context";
import {
  createAccountSchema,
  CreateAccountType,
} from "@/schemas/createAccount.schema";
import {
  handleCreateAccount,
  CreateAccountProps,
} from "@/service/cadastro.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";

export const useCreateAccountViewModel = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const { notify } = useSnackBarContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    setValue,
    getValues,
  } = useForm<CreateAccountType>({
    resolver: zodResolver(
      createAccountSchema
    ) as unknown as Resolver<CreateAccountType>,
    defaultValues: {
      email: "",
      senha: "",
      confSenha: "",
      nome: "",
    },
  });

  const createAccount = useMutation({
    mutationKey: ["createAccount"],
    mutationFn: async ({ email, senha, nome }: CreateAccountProps) =>
      await handleCreateAccount({ email: email, senha: senha, nome: nome }),
    onSuccess: async (data) => {
      if (data) {
        notify({
          message: "Conta criada!",
          open: true,
          type: "success",
        });
        router.back();
      } else {
        notify({
          message: "Usuario ja cadastrado",
          type: "info",
          open: true,
        });
      }
    },
    onError: (data) => {
      console.error("Unecxpected server error" + data);
    },
  });

  const onSubmit = (data: CreateAccountProps) => {
    createAccount.mutate(data);
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
