import { Stack } from "expo-router";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackBarContextProvider } from "@/context/snackbar.context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "@/components/Header/Header";
import { AnwserContextProvider } from "@/context/awsers.context";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SnackBarContextProvider>
          <AnwserContextProvider>
            <PaperProvider>
              <Stack screenOptions={{ header: Header }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen name="cadastro" />
                <Stack.Screen name="quiz" />
              </Stack>
            </PaperProvider>
          </AnwserContextProvider>
        </SnackBarContextProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
