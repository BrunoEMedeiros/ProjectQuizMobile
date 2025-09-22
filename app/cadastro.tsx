import { useSnackBarContext } from "@/context/snackbar.context";
import { useCreateAccountViewModel } from "@/ViewModel/useCreateAccountViewModel";
import useScoreViewModel from "@/ViewModel/useScoreVIewModel";
import { useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const CadastrePage = () => {
  const {
    onSubmit,
    passwordVisible,
    setPasswordVisible,
    control,
    errors,
    handleSubmit,
  } = useCreateAccountViewModel();

  const { message, type, open, notify } = useSnackBarContext();

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      style={styles.container}
    >
      <Text className="text-2xl text-center">Cadastre-se</Text>
      <View className="gap-6 p-6 w-full">
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
        {errors.email && (
          <Text className="color-rose-700">{errors.email.message}</Text>
        )}
        <Controller
          name="nome"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
                mode="outlined"
                label="Nome"
                value={value}
                onChangeText={onChange}
              />
            );
          }}
        />
        {errors.nome && (
          <Text className="color-rose-700">{errors.nome.message}</Text>
        )}
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
        {errors.senha && (
          <Text className="color-rose-700">{errors.senha.message}</Text>
        )}
        <Controller
          name="confSenha"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
                mode="outlined"
                label="Confirme a senha"
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
        {errors.confSenha && (
          <Text className="color-rose-700">{errors.confSenha.message}</Text>
        )}
        <Button
          icon="content-save"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          buttonColor="#1ba802"
          style={{ width: "60%", alignSelf: "center" }}
        >
          <Text className="text-xl">Salvar</Text>
        </Button>
      </View>
      <Portal>
        {open ? (
          <Snackbar
            visible={open}
            duration={2000}
            theme={{
              colors: {
                inverseSurface: "#F2F3F4",
                inverseOnSurface: "#070A0E",
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
    </KeyboardAvoidingView>
  );
};

export default CadastrePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#A6E1FA",
    alignItems: "center",
  },
});

// Teclado cobre senha arrumar
