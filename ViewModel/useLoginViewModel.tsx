import { loginSchema, LoginType } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
export const useLoginViewModel = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

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

  const onSubmit = () => {
    return true;
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
