import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import useQuizViewModel from "@/ViewModel/useQuizViewModel";

export default function App() {
  const {
    control,
    handleSubmit,
    errors,
    onsubmit,
    isSubmitting,
  } = useQuizViewModel();

return
}

