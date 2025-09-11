import { Stack } from "expo-router";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackBarContextProvider } from "@/context/snackbar.context";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "@/components/Header";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SnackBarContextProvider>
          <PaperProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="score" options={{ headerShown: false }} />
              <Stack.Screen name="quiz" />
            </Stack>
          </PaperProvider>
        </SnackBarContextProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
