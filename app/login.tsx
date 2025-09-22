import { useSnackBarContext } from "@/context/snackbar.context";
import { useCreateAccountViewModel } from "@/ViewModel/useCreateAccountViewModel";
import useLoginViewModel from "@/ViewModel/useLoginViewModel";
import useScoreViewModel from "@/ViewModel/useScoreVIewModel";
import { Link, useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import {
  FlatList,
  Pressable,
  ScrollView,
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
  } = useLoginViewModel();

  const { message, type, open, notify } = useSnackBarContext();

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text className="text-2xl text-center">Venha jogar !</Text>
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
        <Button
          icon="content-save"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          buttonColor="#1ba802"
          style={{ width: "60%", alignSelf: "center" }}
        >
          <Text className="text-xl">Salvar</Text>
        </Button>
        <Link href={"/cadastro"} asChild>
          <Text className="text-center">Cadastre-se</Text>
        </Link>
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
    </ScrollView>
  );
};

export default CadastrePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#A6E1FA",
  },
});
