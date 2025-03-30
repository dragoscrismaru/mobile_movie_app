import { Slot, Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
export default function RootLayout() {
  return (
    <>
      <ClerkProvider tokenCache={tokenCache}>
        <ClerkLoaded>
          <StatusBar hidden={true} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
          </Stack>
        </ClerkLoaded>
      </ClerkProvider>
    </>
  );
}
